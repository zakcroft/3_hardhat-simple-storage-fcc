const { ethers, run, network } = require("hardhat");
require("dotenv").config({ path: "./.env.local" });

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to ${simpleStorage.address}`);
  await simpleStorage.store("2");

  console.log(`simpleStorage.favoriteNumber ${simpleStorage.favoriteNumber}`);

  // goerli
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    // await 6 blocks
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contracts");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
