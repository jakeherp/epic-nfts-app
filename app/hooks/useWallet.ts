import { useEffect, useState } from "react";

const useWallet = () => {
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
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return { currentAccount, connectWallet };
};

export default useWallet;
