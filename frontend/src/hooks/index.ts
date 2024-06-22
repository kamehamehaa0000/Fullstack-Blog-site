import { useEffect, useState } from 'react'
import axios from 'axios'
import BACKEND_BASE_URL from './config'

export interface Blog {
  content: string
  title: string
  id: number
  author: {
    name: string
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>()

  useEffect(() => {
    async function sendReq() {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/api/v1/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      setBlog(response.data)
      setLoading(false)
    }
    sendReq()
  }, [id])

  return {
    loading,
    blog,
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    async function sendReq() {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/api/v1/blog/get/bulk`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setBlogs(response.data)
      setLoading(false)
    }
    sendReq()
  }, [])

  return {
    loading,
    blogs,
  }
}
