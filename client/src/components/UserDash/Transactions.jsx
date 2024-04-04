import React, { useEffect, useState } from "react";

import { useUserDataContext } from "../../contexts/UserContextProvider";
const Transactions = () => {
  const { user, products, formatTimestamp } = useUserDataContext();
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    let prods = user?.products.map((item) => {
      return {
        brandID: +item["brandID"].toString(),
        productID: +item["productID"].toString(),
        timestamp: +item["timestamp"].toString(),
        detail: products.filter(
          (singleProduct) => singleProduct.id == +item["productID"].toString()
        ),
      };
    });

    setTransaction(prods);
    console.log(prods);
  }, [user]);
  return (
    <>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg">
          <table className="w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-bold text-left text-xs  text-gray-700 uppercase tracking-wider">
                  Brand Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-bold text-left text-xs  text-gray-700 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-bold text-left text-xs  text-gray-700 uppercase tracking-wider">
                  Timestamp
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 font-bold text-left text-xs  text-gray-700 uppercase tracking-wider">
                  View Trx
                </th>
              </tr>
            </thead>
            <tbody>
              {transaction
                ? transaction.map((transaction) => {
                    return (
                      <tr>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                {transaction.detail[0].brandName}
                              </p>
                              <p className="text-gray-600 whitespace-no-wrap">
                                {transaction.detail[0].title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className=" text-center py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-blue-900 font-semibold whitespace-no-wrap ">
                            ${Math.round(transaction.detail[0].price)}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">USD</p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatTimestamp(transaction.timestamp)}
                          </p>
                        </td>

                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
                          <a target="_blank" href="https://sepolia.arbiscan.io/address/0x26Ca7d950d8CCC74A1114B63b3A47d3Ba6F64916">
                            View
                          </a>
                        </td>
                      </tr>
                    );
                  })
                : "No Transaction History !!!"}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transactions;
