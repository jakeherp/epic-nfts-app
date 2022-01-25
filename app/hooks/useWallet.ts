import { useEffect, useState } from "react";
import setupEventListener from "~/utils/setupEventListener";

const useWallet = (contractAddress: string) => {
  const [currentAccount, setCurrentAccount] = useState();

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) return;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      setupEventListener(contractAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfWalletConnected = async () => {
    const { ethereum } = window as any;

    if (!ethereum) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      setupEventListener(contractAddress);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return { currentAccount, connectWallet };
};

export default useWallet;
