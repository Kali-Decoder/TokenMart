const loayalityTokenRewardAddress ="0x394b899AAb17EfCF200AA3F9ce12F6fDf740E6Aa";
const tokenMartAddress = "0x26Ca7d950d8CCC74A1114B63b3A47d3Ba6F64916";
const tokenMartNftAddress = "0x5c7176e3e2511577E495AE8872EB1a84fD7959E1";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function deployContract() {
  const deployedContract = await ethers.deployContract(
    "EcommerceBrandTokenReward",
    [loayalityTokenRewardAddress]
  );
  console.log("[main] Waiting for Deployment...");
  await deployedContract.waitForDeployment();
  const address = await deployedContract.getAddress();
  console.log("EcommerceBrandTokenReward(Token Mart Address) Contract Address:", address);
  await sleep(30 * 1000);
  console.log("Verifying Ecommerce Contract on Given Network ...");
  //   Verify the Liquidity Locking Contract
  await hre.run("verify:verify", {
    contract: "contracts/TokenMart.sol:EcommerceBrandTokenReward",
    address: address,
    constructorArguments: [loayalityTokenRewardAddress],
  });
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
