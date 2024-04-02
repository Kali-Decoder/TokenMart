import { SimpleGrid, Space } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useUserDataContext } from "../../contexts/UserContextProvider";
import TokenCard from "./TokenCard";
import numeral from "numeral";
const Token = () => {
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
      {user ? (
        user.brandBalances.map((item, index) => {
          return (
            <TokenCard
              key={index}
              title={item.name}
              brandID={item.id}
              value={numeral(item.balance).format("0.0a")}
            />
          );
        })
      ) : (
        <></>
      )}
    </SimpleGrid>
  );
};

export default Token;
