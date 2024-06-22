import htmlReactParser from 'html-react-parser/lib/index'
import { Link } from 'react-router-dom'

interface BlogCardPropsType {
  authorName: string
  title: string
  content: string
  publishDate: string
  id: number
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate,
}: BlogCardPropsType) => {
  const shortContent = htmlReactParser(content.slice(0, 270))

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-6 border-b rounded-lg bg-yellow-100 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className=" pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className=" pl-2 flex justify-center flex-col">
            <Circle />
          </div>
          <div className="pl-2  text-slate-500 text-sm flex justify-center flex-col">
            {publishDate}
          </div>
        </div>
        <div className="text-xl text-zinc-700 font-semibold pt-2">{title}</div>
        <div className="text-md w-full text-zinc-600">
          <p className="inline">{shortContent} .....</p>
        </div>
        <div className="text-slate-500 text-sm pt-4">
          {`${Math.ceil(content.length / 1000)} minute(s) read`}
        </div>
      </div>
    </Link>
  )
}

export function Avatar({ name }: { name: string }) {
  const firstName = name[0]
  const lastName = name.split(' ')[1] ? name.split(' ')[1][0] : ' '
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden  rounded-full bg-zinc-800">
      <span className="font-medium text-gray-100">{firstName + lastName}</span>
    </div>
  )
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}

export default BlogCard
