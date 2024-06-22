import { Avatar } from './BlogCard'
import { Blog } from '../hooks'
import Navbar from './Navbar'
import HTMLReactParser from 'html-react-parser/lib/index'
const BlogOpened = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 12 December 2025</div>
            <div className="pt-4">{HTMLReactParser(blog.content)}</div>
          </div>
          <div className="col-span-4">
            <div className="text-zinc-600 text-lg font-semibold underline underline-offset-4">
              Author
            </div>
            <div className="flex w-full gap-2">
              <Avatar name={blog.author.name || 'Anonymous'} />
              {'  '}
              <div>
                <div className="text-xl font-semibold">
                  {blog.author.name || 'Anonymous'}
                </div>
                <div className="pt-2 text-md text-slate-500">
                  Description about the author.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogOpened
