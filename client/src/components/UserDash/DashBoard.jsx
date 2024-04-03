import React, { useState } from "react";
import BackGradients from "../BackGradients";
import { Card, Group, Image, ScrollArea, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import Information from "./Information";
import Token from "./Token";
import Transactions from "./Transactions";
import Referral from "./Referral";
import {
  IconShare3,
  IconHistory,
  IconCoin,
  IconGraph,
} from "@tabler/icons-react";

const DashBoard = () => {
  const [selectedButton, setSelectedButton] = useState("dash");
  const selectedCss = "mb-2 bg-gray-800 rounded shadow";
  const unSelectedCss = "mb-2 rounded hover:shadow hover:bg-gray-800";

  return (
    <>
      <BackGradients />
      <div className="flex ">
        <div className="px-4 py-2 bg-black lg:w-1/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-8 h-8 text-white lg:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <div className="hidden lg:block mt-10 cursor-pointer">
            <div className="my-2 mb-6">
              <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
            </div>
            <ul className="mt-10">
              <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
                <Link to="/">
                  <a className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block w-6 h-6 mr-2 -mt-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </a>
                </Link>
              </li>
              <li
                className={`${
                  selectedButton == "dash" ? selectedCss : unSelectedCss
                }`}
              >
                <a
                  onClick={() => setSelectedButton("dash")}
                  className="flex inline-block w-full h-full px-3 py-2 font-bold text-white"
                >
                  <IconGraph className="mr-2" />
                  Dashboard
                </a>
              </li>
              <li
                className={`${
                  selectedButton == "token" ? selectedCss : unSelectedCss
                }`}
              >
                <a
                  onClick={() => setSelectedButton("token")}
                  className="flex inline-block w-full h-full px-3 py-2 font-bold text-white "
                >
                  <IconCoin className="mr-2" />
                  Tokens
                </a>
              </li>
              <li
                className={`${
                  selectedButton == "refer" ? selectedCss : unSelectedCss
                }`}
              >
                <a
                  onClick={() => setSelectedButton("refer")}
                  className="flex inline-block w-full h-full px-3 py-2 font-bold text-white "
                >
                  <IconShare3 className="mr-2" />
                  Refferals
                </a>
              </li>
              <li
                className={`${
                  selectedButton == "transactions" ? selectedCss : unSelectedCss
                }`}
              >
                <a
                  onClick={() => setSelectedButton("transactions")}
                  className="flex inline-block w-full h-full px-3 py-2 font-bold text-white "
                >
                  <IconHistory className="mr-2" />
                  Transactions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full px-4 py-2 bg-black lg:w-full h-full">
          <div className="flex flex-col ">
            {selectedButton == "transactions" ? null : (
              <a
                className="relative cursor-pointer"
                href="https://testnets.opensea.io/assets/mumbai/0x502c7b585dbef040a5b7e71217270dd77287c86b/1"
                target="_blank"
              >
                <div className="flex flex-row relative mt-[13vh] justify-between">
                  <div>
                    <div className="relative">
                      <Card
                        padding={"lg"}
                        radius={"md"}
                        withBorder
                        className="ml-[2vw]"
                        h={"48vh"}
                      >
                        <Card.Section p={12} pt={25}>
                          <Image
                            className="object-contain"
                            src={"./assets/nf.avif"}
                            height={"35vh"}
                            width={"50vw"}
                            alt="monkey-nft"
                            radius={"md"}
                          />
                        </Card.Section>
                        <div className="absolute bg-[#ffe150] border-4 border-[#25262b] rounded-full w-[8vw] h-[4vh] top-[.25vh] left-0 right-0 m-auto">
                          <div className="flex w-full justify-center content-center">
                            {/* <Text color='black'>$45</Text> */}
                          </div>
                        </div>
                        <Group position="center" mt="md" mb="xs">
                          <Text className="mb-5" weight={"20vw"}>
                            Token ℳart
                          </Text>
                        </Group>
                      </Card>
                    </div>
                  </div>
                </div>
              </a>
            )}
            <div className="mt-[3vh] ml-[2vw]">
              <div className="text-[#8BE8E5] font-semibold text-[3rem] mb-[1vh]">
                {selectedButton == "dash"
                  ? " Portfolio"
                  : selectedButton == "token"
                  ? "Brand Token Portfolio"
                  : selectedButton == "transactions"
                  ? "Transaction History"
                  : "Refferals"}
              </div>
              <ScrollArea
                h={selectedButton == "transactions" ? "100vh" : "85vh"}
                w={selectedButton == "transactions" ? "70vw" : "50vw"}
                className=""
              >
                {selectedButton == "dash" ? (
                  <Information></Information>
                ) : selectedButton == "token" ? (
                  <Token></Token>
                ) : selectedButton == "transactions" ? (
                  <Transactions></Transactions>
                ) : (
                  <Referral></Referral>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
