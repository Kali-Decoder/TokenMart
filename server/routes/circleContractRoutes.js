const fetch = require("node-fetch");

async function getNftContractDetails() {
  const url = "https://api.circle.com/v1/w3s/contracts/import";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TEST_API_KEY}`,
    },
    body: '{"address":"0x502C7b585DbEf040a5B7e71217270dD77287c86b","blockchain":"mumbai"}'
    // GETTING THE DETAILS OF TOKENMART NFT details 
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getCircleContract();