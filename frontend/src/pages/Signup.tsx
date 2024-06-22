// import QuoteComponent from '../components/QuoteComponent'
import SingupComponent from '../components/SingupComponent'

const Signup = () => {
  return (
    <div className="text-black w-screen h-screen flex items-center justify-center">
      <div className="w-10/12  rounded-2xl bg-gray-100 grid grid-cols-1 lg:grid-cols-2">
        <SingupComponent />

        <div className="rounded-r-2xl  w-full flex items-center justify-center">
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-r-2xl object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
