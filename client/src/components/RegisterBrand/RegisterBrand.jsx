import React, { useCallback, useEffect, useState } from "react";
import { useUserDataContext } from "../../contexts/UserContextProvider";
import BackGradients from "../BackGradients";
import {toast} from "react-toastify";
const RegisterBrand = () => {
  const [brandName, setBrandName] = useState(),
    [brandSymbol, setBrandSymbol] = useState(),
    [tokenPercentage, setTokenPercentage] = useState(),
    [basePrice, setBasePrice] = useState(),
    [walletAddress, setWalletAddresss] = useState(),
    [companyRegNo, setCompanyRegNo] = useState();

  const { registerBrand,registerBrandOnTableLand } = useUserDataContext();
  const registeringBrand = async () => {
    if (!brandName || !brandSymbol || !tokenPercentage || !basePrice || !companyRegNo) {
      toast.error("Please fill all the fields");
      return;
    };

    let id = toast.loading("Adding Details on TableLand...",{autoClose:true});
    console.log(brandName , brandSymbol , tokenPercentage , basePrice);
    await registerBrandOnTableLand(companyRegNo, brandName, brandSymbol, tokenPercentage, basePrice);
    toast.success("Details added on TableLand",{id});
    await registerBrand(brandName, brandSymbol, tokenPercentage, basePrice);
  };

  return (
    <>
      <BackGradients />
      <div className="flex flex-col h-screen justify-center items-center bg-black">
        <div className="rounded-2xl w-[50%] text-[#1A2421] bg-black [ p-8 md:p-10 lg:p-10 ] border">
          <p className="mb-6 [ text-sm text-[#1A2421]/70 text-opacity-50 ] text-blue-300">
            Register A New brand
          </p>
          <label
            for="brandName"
            className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]"
          >
            <input
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
              className="form-input border block w-full rounded-lg leading-none focus:outline-none placeholder-white/50 [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#fff] focus:text-white ]"
              type="text"
              name="brandName"
              id="brandName"
              placeholder="Brand Name"
            />
          </label>
          <label
            value={brandSymbol}
            onChange={(e) => setBrandSymbol(e.target.value)}
            for="brandSymbol"
            className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]"
          >
            <input
              className="form-input border block w-full rounded-lg leading-none focus:outline-none placeholder-white/50 [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#fff] focus:text-white ]"
              type="text"
              name="brandSymbol"
              id="brandSymbol"
              placeholder="brand symbol"
            />
          </label>
          <label
            value={tokenPercentage}
            onChange={(e) => setTokenPercentage(e.target.value)}
            for="tokenPercentage"
            className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]"
          >
            <input
              className="form-input border block w-full rounded-lg leading-none focus:outline-none placeholder-white/50 [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#fff] focus:text-white ]"
              type="text"
              name="tokenPercentage"
              id="tokenPercentage"
              placeholder="What is Brand's Token Percentage for rewards"
            />
          </label>
          <label
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            for="basePrice"
            className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]"
          >
            <input
              className="form-input border block w-full rounded-lg leading-none focus:outline-none placeholder-white/50 [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#fff] focus:text-white ]"
              type="text"
              name="basePrice"
              id="basePrice"
              placeholder="What is Brand's minimum purchase amount for reward"
            />
          </label>
          <label
            value={walletAddress}
            onChange={(e) => setWalletAddresss(e.target.value)}
            for="walletAddress"
            className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]"
          >
            <input
              className="form-input border block w-full rounded-lg leading-none focus:outline-none placeholder-white/50 [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#fff] focus:text-white ]"
              type="text"
              name="walletAddress"
              id="walletAddress"
              placeholder="Brand's wallet Address"
            />
          </label>
          <label
            value={companyRegNo}
            onChange={(e) => setCompanyRegNo(e.target.value)}
            for="companyRegNo"
            className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]"
          >
            <input
              className="form-input border block w-full rounded-lg leading-none focus:outline-none placeholder-white/50 [ transition-colors duration-200 ] [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] [ bg-black/20 focus:bg-black/25 ] [ text-[#fff] focus:text-white ]"
              type="text"
              name="companyRegNo"
              id="companyRegNo"
              placeholder="Brand Registeration Number"
            />
          </label>
          <>
            <button onClick={registeringBrand} className="form-input w-full mt-4 rounded-lg  text-white focus:outline-none [ p-3 md:p-4 lg:p-4 ] [ transition-colors duration-500 ] [ bg-blue-800 hover:bg-blue-700 ] cursor-pointer">
              Register
            </button>
          </>
        </div>
      </div>
    </>
  );
};

export default RegisterBrand;
