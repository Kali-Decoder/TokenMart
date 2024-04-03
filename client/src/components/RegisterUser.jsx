import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";

import Confetti from "react-confetti";
import { useAccount } from "wagmi";
import { useUserDataContext } from "../contexts/UserContextProvider";
const RegisterUser = () => {
  const { registerUserUsingNFTVerification, confetti } = useUserDataContext();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [walletAddress, setWalletAddress] = useState("");
  const { address } = useAccount();
  const handlePaste = async (event) => {
    const pastedText = event.clipboardData.getData("Text");
    setWalletAddress(pastedText);
  };

  const registerUser = async () => {
    if (!walletAddress) return;
    await registerUserUsingNFTVerification(walletAddress);
  };

  return (
    <>
      {confetti && <Confetti width={width} height={height} />}

      <div
        className="form-wrapper 
         min-h-screen
         [ p-0 md:p-0 lg:p-0 ]
         [ flex justify-center flex-col items-center ] bg-black"
      >
        <div className="bg-black flex justify-end py-10 px-10">
          <ConnectButton accountStatus="avatar" showBalance={true} />
        </div>
        <div
          className="
               max-w-xl
               rounded-2xl
                w-[50%]
               text-[#1A2421]
               bg-black
               [ p-8 md:p-10 lg:p-10 ]
               border"
        >
          <h1 className="mb-6 uppercase text-yellow-600 font-bold [ text-xl md:text-2xl lg:text-2xl ]">
            NFT-Gating Verification
          </h1>

          {address ? (
            <>
              <p className="mb-6 [ text-sm text-[#1A2421]/70 text-opacity-50 ] text-blue-300">
                Paste Address for Verification
              </p>
              <label
                for="walletAddress"
                className="form-label relative block mb-4 text-black/50 focus-within:text-[#333]"
              >
                <input
                  className="form-input 
              
              border 
                    block w-full rounded-lg leading-none focus:outline-none placeholder-white/50 
                    [ transition-colors duration-200 ] 
                    [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] 
                    [ bg-black/20 focus:bg-black/25 ] 
                    [ text-[#fff] focus:text-white ]"
                  type="text"
                  name="walletAddress"
                  id="walletAddress"
                  placeholder="Paste your Address 0xcfa0b5...407891"
                  onPaste={handlePaste}
                />
              </label>
              <button
                onClick={registerUser}
                className="form-input w-full mt-1 rounded-lg  text-white focus:outline-none
                   [ p-3 md:p-4 lg:p-4 ] 
                   [ transition-colors duration-500 ] 
                   [ bg-blue-800 hover:bg-blue-700 ] cursor-pointer"
              >
                Register
              </button>
            </>
          ) : (
            <span className="flex items-center mt-2 font-medium tracking-wide text-red-400 text-xs  ml-1">
              Connect Your Wallet !
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
