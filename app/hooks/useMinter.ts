import { ethers } from "ethers";
import { useState } from "react";
import myEpicNft from "../utils/abi-files/MyEpicNFT.json";

const useMinter = () => {
  const [isMinting, setIsMinting] = useState(false);

  const mintNft = async () => {
    const CONTRACT_ADDRESS = "0xAa1dBdb0Ab2003D65ABaA10fcBC5a194863BF288";

    try {
      const { ethereum } = window as any;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        setIsMinting(true);

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.");
        await nftTxn.wait();

        setIsMinting(false);
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setIsMinting(false);
      console.log(error);
    }
  };

  return { isMinting, mintNft };
};

export default useMinter;
