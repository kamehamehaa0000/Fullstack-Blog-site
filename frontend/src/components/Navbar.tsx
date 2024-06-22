import { Avatar } from './BlogCard'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="border-b flex justify-between px-8 py-4">
      <Link
        to={'/blogs'}
        className=" px-6 py-2 rounded-tr-full  text-xl font-bold font justify-center cursor-pointer"
      >
        BiLOG
      </Link>
      <div className="flex items-center">
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  "
          >
            New
          </button>
        </Link>
        <div className="flex group  items-center ">
          <Avatar name="Aayush Gupta" />
          <button
            className=" hidden w-0 p-2 font-semibold group-hover:flex h-full group-hover:w-[50px] transition-all duration-300 ease-in-out"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/signin')
              window.location.reload()
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
