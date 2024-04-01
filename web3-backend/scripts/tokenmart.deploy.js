const loayalityTokenRewardAddress ="0xc6865bad68cf4803aA569AE0eF58C2784b95857E";
const tokenMartAddress = "0x6dbeC3133f274e0446f821a27D801968c563E29F";
const tokenMartNftAddress = "0x502C7b585DbEf040a5B7e71217270dD77287c86b";


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
