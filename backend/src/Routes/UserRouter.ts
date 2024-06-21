import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { HTTPException } from 'hono/http-exception'

const userRouter = new Hono()
interface SignupType {
  email: string
  password: string
  name?: string
}
interface LoginType {
  email: string
  password: string
}

async function hashPassword(password: string): Promise<string> {
  const encodedPassData = new TextEncoder().encode(password) //encodes the password string into a Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedPassData) //hash the password using the SHA-256 algorithm.
  // Convert the hash buffer into a Uint8Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  // convert each byte (in Uint8array) to hexadecimal string and concatenate them
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  //return hexadecimal hash string
  return hashHex
}

userRouter.post('/signup', async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  const body: SignupType = await c.req.json()
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })
    if (existingUser) {
      throw new HTTPException(401, {
        message: 'user already exists with this email',
      })
    }
    const hashedPassword = await hashPassword(body.password)
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (error: any) {
    c.status(error.status)
    return c.json({ message: error.message, status: error.status })
  }
})
userRouter.post('/signin', async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body: LoginType = await c.req.json()

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (!user) {
      throw new HTTPException(403, { message: 'Invalid email or password' })
    }

    const hashedPassword = await hashPassword(body.password)

    if (hashedPassword !== user.password) {
      throw new HTTPException(405, { message: 'Invalid email or password' })
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (error: any) {
    c.status(error.status)
    return c.json({ message: error.message, status: error.status })
  }
})

export default userRouter
