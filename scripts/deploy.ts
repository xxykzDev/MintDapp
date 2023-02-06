import { ethers } from "hardhat";

async function main() {
  const FARNFT = await ethers.getContractFactory("FARNFT");
  const farnft = await FARNFT.deploy();

  await farnft.deployed();

  console.log(`FARNFT deployado en la address: ${farnft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
