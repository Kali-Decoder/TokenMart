import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";
import BackGradients from "./BackGradients";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://snehagupta1907.github.io/data/product.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const product = data.find((item) => item.id.toString() === productId);
        console.log(product);
        setProductDetails(product);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  if (!productDetails) {
    return (
      <div className="loader-container bg-black" id="loader-container">
        <div className="loader">
          <div className="rotatingLoader"></div>
        </div>
      </div>
    );
  }

  const descriptionPoints = productDetails.description.split(". ");

  return (
    <>
    <BackGradients/>
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-fit text-white">
      <NavBar />   
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 py-8 md:py-16">
          <div className="product_images bg-cover bg-center flex justify-center items-center overflow-hidden transform hover:scale-105 transition-transform relative ">
            <img
              src={productDetails.image}
              alt={productDetails.title}
              className="w-full md:rounded-md overflow-hidden"
              style={{ maxWidth: "70%", height: "60%" }}
            />
          </div>
          <div
            className="product_details p-4 md:p-3 shadow-lg"
            style={{ backgroundColor: "#161616" }}
          >
              <MdArrowBack
                className="cursor-pointer text-3xl mb-2"
                onClick={() => window.history.back()}
              />
               <h2 className="text-sm title-font text-gray-300 tracking-widest">
                {productDetails.brandName}
              </h2>
            <h2 className="text-gray-400 text-4xl md:text-3xl title-font font-medium mb-1">
              {productDetails.title}
            </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < Math.floor(productDetails.rating.rate) ? (
                      <AiFillStar className="text-yellow-500" />
                    ) : (
                      <AiOutlineStar className="text-yellow-500" />
                    )}
                  </span>
                ))}
                <span className="text-gray-600 ml-3">
                  {productDetails.rating.count} Reviews
                </span>
              </span>
            </div>

            <div className="mb-4 md:mb-6">
              <p className="text-sm md:text-base">
                Verified Availability:{" "}
                <span className="text-blue-400">In-Stock</span>
              </p>
              <p className="text-sm md:text-base">
                Product ID: <span className="text-blue-400">{productId}</span>
              </p>
              <p className="text-sm md:text-base">
                Tags:{" "}
                <span className="text-blue-400">Fashion, Blockchain, NFT</span>
              </p>
            </div>

            <ul className="list-disc pl-6 mb-2 md:mb-4">
              {descriptionPoints.map((point, index) => (
                <li key={index} style={{ fontSize: "14px" }}>
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <div className="colors flex items-center gap-x-2">
                  <BsFillCircleFill className="red" />
                  <BsFillCircleFill className="blue" />
                  <BsFillCircleFill className="white" />
                </div>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-800 py-2 focus:outline-none focus:border-red-500 text-black pl-3 pr-10">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-bold text-2xl text-white">
                ${productDetails.price}
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex ml-auto bg-blue-400 hover:bg-blue-700 text-white font-bold border-0 py-2 px-6 focus:outline-none  rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CheckoutModal
          productDetails={productDetails}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <Footer />
    </div>
    </>
  );
};

export default ProductDetails;
