import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
  let simpleStorageFactory: SimpleStorage__factory,
    simpleStorage: SimpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should return 0", async function () {
    const current = await simpleStorage.retrieve();
    const expected = "0";
    assert.equal(current.toString(), expected);
  });

  it("Should return 7", async function () {
    const expected = "7";
    const txRes = await simpleStorage.store(expected);

    // wait a 1 block
    txRes.wait(1);

    const current = await simpleStorage.retrieve();
    assert.equal(current.toString(), expected);
  });

  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();
  //
  //   expect(await greeter.greet()).to.equal("Hello, world!");
  //
  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  //
  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();
  //
  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
});
