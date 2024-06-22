import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Singin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import BlogPublish from './pages/BlogPublish'
import { useEffect, useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(localStorage.getItem('token') ? true : false)
    }
  }, [])

  console.log(isLoggedIn)
  return (
    <div className="w-screen h-screen font-[gilroy]">
      <BrowserRouter>
        {isLoggedIn ? (
          <Routes>
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<BlogPublish />} />
            <Route path="/*" element={<Blogs />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />{' '}
            <Route path="/*" element={<Signin />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
