import QuoteComponent from '../components/QuoteComponent'
import SigninComponent from '../components/SigninComponent'

const Singin = () => {
  return (
    <div className="text-black w-screen h-screen flex items-center justify-center">
      <div className=" rounded-2xl bg-slate-100 grid grid-cols-1 lg:grid-cols-2">
        <SigninComponent />

        <div className="p-8 rounded-r-2xl  bg-gray-200 w-full flex items-center justify-center">
          <QuoteComponent />
        </div>
      </div>
    </div>
  )
}

export default Singin
