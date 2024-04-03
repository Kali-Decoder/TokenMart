import React from 'react'
import { RxCheck } from "react-icons/rx";
import NavBar from './Navbar';
import BackGradients from './BackGradients';

const Payment = () => {
  return (
    <>
    <NavBar/>
    <div className="flex items-center justify-center h-screen bg-gray-900">
        
      <div className="bg-gray-600 p-8 rounded-lg shadow-md">
        <div className="rounded-full h-32 w-32 bg-blue-300 flex items-center justify-center mx-auto mb-6">
          <i className="checkmark text-blue-900 text-6xl"><RxCheck size={80}/></i>
        </div>
        <h1 className="text-blue-700 font-semibold text-4xl mb-2">Success</h1>
        <p className="text-white text-lg">
          We received your purchase request;<br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
    </>
  )
}

export default Payment