import { useEffect, useState } from "react";
import styles from "../styles/index.css";

const TWITTER_HANDLE = "jakeherp";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  const [currentAccount, setCurrentAccount] = useState<string>();

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window as any;

    if (!ethereum) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    }
  };

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

  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  console.log("currentAccount", currentAccount);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <h1 className="header gradient-text">My Epic NFT Collection</h1>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {!currentAccount ? (
            renderNotConnectedContainer()
          ) : (
            <button
              onClick={(noop: unknown) => noop}
              className="cta-button connect-wallet-button"
            >
              Mint NFT
            </button>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter" className="twitter-logo" src="/twitter.svg" />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}
