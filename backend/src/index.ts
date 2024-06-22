import { Hono } from 'hono'
import userRouter from './Routes/UserRouter'
import blogRouter from './Routes/BlogRouter'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>().basePath('/api/v1')
app.use('/*', cors())
app.route('/user', userRouter)
app.route('/blog', blogRouter)

export default app
