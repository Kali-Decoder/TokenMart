import { Button, Space } from "@mantine/core";
import React from "react";
import { useUserDataContext } from "../../contexts/UserContextProvider";
const InformationCard = ({ title, value, displayButton, icon }) => {
    const {claimLoyalityTokens} = useUserDataContext();
    const claimingLoyalityTokens=async()=>{
        await claimLoyalityTokens();
    }
  return (
    <div className="relative flex border items-center rounded-md h-[15vh] p-[1vw]">
      <div>
        <div className="p-2 bg-indigo-600 rounded">{icon}</div>
      </div>
      <Space w={"2vw"} />
      {displayButton && (
        <div className="absolute flex flex-row m-auto justify-end top-[2vh] right-[1vw]">
          {value == 0 ? (
            <Button
              disabled
              className="bg-[#4f46e5] text-white"
            >
              No Redeem
            </Button>
          ) : (
            <Button onClick={claimingLoyalityTokens} className="bg-[#4f46e5]">
              Redeem
            </Button>
          )}
        </div>
      )}
      <div>
        <div className="flex flex-col">
          <div className="text-[#4f46e5] font-semibold text-[3rem]">
            {value}
          </div>
          <h4 className="text-2xl text-white">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
