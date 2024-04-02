import { SimpleGrid, Space } from "@mantine/core";
import React from "react";
import { useUserDataContext } from "../../contexts/UserContextProvider";
import InformationCard from "./InformationCard";
import numeral from "numeral";
import {IconAward,IconBuildingBank, IconCoins,IconCurrencyEthereum,IconCurrencyBitcoin,IconShare3 } from '@tabler/icons-react'

const Information = () => {
  const { user } = useUserDataContext();
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 1 },
        { minWidth: "md", cols: 1 },
        { minWidth: "lg", cols: 2 },
        { minWidth: "xl", cols: 2, spacing: "md" },
      ]}
    >
      <InformationCard
        title={"Total Dollar Spent"}
        value={"$ " + numeral(user?.totalEtherSpent).format("0.0a")}
        displayButton={false}
        icon={<IconCurrencyEthereum className="w-10 h-10" color="white"/>}
      />
      <InformationCard
        title={"Total Token Rewards"}
        value={numeral(user?.totalTokenRewards).format("0.0a")}
        displayButton={false}
        icon={<IconAward className="w-10 h-10" color="white"/>}
      />
      <InformationCard
        title={"Number of Refferals"}
        value={numeral(user?.numberOfRefferrels).format("0.0a")}
        displayButton={false}
        icon={<IconShare3 className="w-10 h-10" color="white"/>}
      />
      <InformationCard
        title={"Total Loyality Tokens"}
        value={numeral(user?.totalLoyalityTokenBalance).format("0.0a")}
        displayButton={true}
        icon={<IconCoins className="w-10 h-10" color="white"/>}
      />
       <InformationCard
        title={"Total Balance"}
        value={numeral(user?.totalBalance).format("0.0a")}
        displayButton={false}
        icon={<IconBuildingBank className="w-10 h-10" color="white"/>}
      />
    </SimpleGrid>
  );
};

export default Information;
