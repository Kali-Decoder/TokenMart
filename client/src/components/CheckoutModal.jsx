import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useUserDataContext } from "../contexts/UserContextProvider";
import {toast} from "react-toastify";
const CheckoutModal = ({ productDetails, closeModal }) => {
  const {purchaseProduct,verified} = useUserDataContext();
  const checkOut=async()=>{
    if(!verified){
      window.location.href="/auth";
      return;
    }
    await purchaseProduct(productDetails.brandId,productDetails.id,productDetails.price);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-70"></div>
      <div className="modal-content bg-gray-800 text-white rounded-lg z-10 w-[500px] h-[300px] p-4 shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <RxCross2 size={20} />
        </button>
        <div className="flex items-center mb-4">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="w-24 h-24 object-contain rounded border border-gray-600 mr-4"
          />
          <div>
            <p className="text-lg font-semibold">{productDetails.title}</p>
            <p className="text-sm text-gray-300">{productDetails.description.slice(0, 150)}...</p>
            <p className="text-lg font-semibold mt-3">${productDetails.price}</p>
          </div>
        </div>

          <button onClick={checkOut} className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 rounded w-full transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
 
  );
};

export default CheckoutModal;
