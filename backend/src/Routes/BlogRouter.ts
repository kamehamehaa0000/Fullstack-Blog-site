import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { HTTPException } from 'hono/http-exception'

const blogRouter = new Hono<{
  Variables: {
    userId: string
  }
}>()
type BodyType = {
  title: string
  content: string
}
type UpdateBlogBody = {
  id: string
  title: string
  content: string
}

blogRouter.use(async (c: any, next) => {
  const header = c.req.header('Authorization') || ''
  const token = header.split(' ')[1]
  if (!token) {
    c.status(401)
    return c.json({ error: 'Auth header not found' })
  }
  const response = await verify(token, c.env.JWT_SECRET)
  if (!response.id) {
    c.status(401)
    return c.json({ error: 'unauthorized' })
  }
  c.set('userId', response.id)
  await next()
})

// create a blog
blogRouter.post('/upload', async (c: any) => {
  const userId = c.get('userId')

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const body: BodyType = await c.req.json()
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: true,
        author_id: userId,
      },
    })
    return c.json({
      id: post.id,
    })
  } catch (error: any) {
    c.json(error)
  }
})

//update a blog
blogRouter.put('/update', async (c: any) => {
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body: UpdateBlogBody = await c.req.json()
  await prisma.post.update({
    where: {
      id: body.id,
      author_id: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  })
  return c.json({ message: 'Updated Successfully' })
})
//get blog by blog id
blogRouter.get('/:id', async (c: any) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      author_id: true,
      title: true,
      content: true,
      published: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })
  return c.json(post)
})
//get all blog by a user
blogRouter.get('/get/byartist/:id', async (c: any) => {
  const userId = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    where: {
      author_id: userId,
    },
    select: {
      id: true,
      author_id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  return c.json(blogs)
})

// get all blogs
blogRouter.get('/get/bulk', async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      author_id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  return c.json(blogs)
})

export default blogRouter
