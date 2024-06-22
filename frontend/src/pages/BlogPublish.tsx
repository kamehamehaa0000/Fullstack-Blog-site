import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const BlogPublish = () => {
  const [title, setTitle] = useState('')
  const [contentValue, setContentValue] = useState('')
  const navigate = useNavigate()
  const handleChange = (content: any) => {
    setContentValue(content)
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full pt-8 px-4 md:px-8">
        <div className="max-w-screen-lg  w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            type="text"
            className="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Title"
          />
          <div className="my-4">
            <ReactQuill value={contentValue} onChange={handleChange} />
          </div>
          <button
            onClick={async () => {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/upload`,
                {
                  title,
                  content: contentValue,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                }
              )
              navigate(`/blog/${response.data.id}`)
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPublish
