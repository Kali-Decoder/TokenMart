import { Button, Space } from "@mantine/core";
import React from "react";
import { useUserDataContext } from "../../contexts/UserContextProvider";
import { IconCoin } from "@tabler/icons-react";

const TokenCard = ({ title, value, brandID }) => {
  const { claimBrandTokens } = useUserDataContext();
  const claimingTokens = async () => {
    if (!brandID) return;
    await claimBrandTokens(brandID);
  };
  return (
    <div className="relative flex border items-center rounded-md h-[15vh] p-[1vw]">
      <div>
        <div className="p-3 bg-indigo-600 rounded">
          <IconCoin className="w-10 h-10" color="white"/>
        </div>
      </div>
      <Space w={"2vw"} />
      <div className="absolute flex flex-row m-auto justify-end top-[2vh] right-[1vw]">
        {value == 0 ? (
          <Button onClick={claimingTokens} disabled className="bg-[#4f46e5] text-white">
            No Redeem
          </Button>
        ) : (
          <Button onClick={claimingTokens} className="bg-[#4f46e5]">
            Redeem
          </Button>
        )}
      </div>
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

export default TokenCard;
