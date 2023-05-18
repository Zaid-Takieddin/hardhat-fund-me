const { assert } = require("chai");
const { ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", () => {
  let deployer;
  let fundMe;
  let sendValue = ethers.utils.parseEther("0.03");
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    fundMe = await ethers.getContract("FundMe", deployer);
  });

  it("allows people to fund and withdraw", async () => {
    const fundTxResponse = await fundMe.fund({ value: sendValue });
    await fundTxResponse.wait(1);
    const withdrawTxResponse = await fundMe.cheaperWithdraw();
    await withdrawTxResponse.wait(1);
    const endingBalance = await fundMe.provider.getBalance(fundMe.address);
    assert.equal(endingBalance.toString(), "0");
  });
});
