import BlogOpened from '../components/BlogOpened'
import Navbar from '../components/Navbar'
import { Spinner } from '../components/Spinner'
import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom'

// atomFamilies/selectorFamilies
const Blog = () => {
  const { id } = useParams()
  const { loading, blog } = useBlog({
    id: id || '',
  })

  if (loading || !blog) {
    return (
      <div>
        <Navbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <BlogOpened blog={blog} />
    </div>
  )
}
export default Blog
