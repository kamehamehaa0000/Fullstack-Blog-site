import BlogCard from '../components/BlogCard'
import Navbar from '../components/Navbar'

import { useBlogs } from '../hooks'
import { BlogSkeleton } from '../components/BlogSkeleton'
const Blogs = () => {
  const { loading, blogs } = useBlogs()
  return (
    <div>
      <Navbar />
      <div className="mt-5 flex flex-col items-center gap-4 justify-center">
        {loading ? (
          <div>
            <div className="flex justify-center">
              <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
              </div>
            </div>
          </div>
        ) : (
          blogs.map((blog, index) => {
            return (
              <BlogCard
                key={index}
                id={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishDate="20-feb-2024"
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default Blogs
