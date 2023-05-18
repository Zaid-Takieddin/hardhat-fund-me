const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { depolyer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", depolyer);
  console.log("Withdrawing......");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait(1);
  console.log("Got it back!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
