const main = async () => {
  // compile contract and generate artefacts
  const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
  // hardhat creates local Ethereum network for this contract
  const nftContract = await nftContractFactory.deploy();
  // wait for contract to be mined and deployed to local blockchain
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function
  let txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined
  await txn.wait();

  // Mint another NFT for fun
  txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
