import { ethers } from "hardhat";

async function main() {
  const BuyStorage = await ethers.getContractFactory("Sub");
  const storage = await BuyStorage.deploy();

  await storage.deployed();
  console.log("User deployed to:", storage.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
