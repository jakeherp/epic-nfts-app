import { ethers } from "ethers";
import styles from "../styles/index.css";
import useWallet from "../hooks/useWallet";
import useMinter from "~/hooks/useMinter";

const TWITTER_HANDLE = "jakeherp";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x0c5976e639c4705061984adA7Ab07df8Cc6796CC";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  const { connectWallet, currentAccount } = useWallet(CONTRACT_ADDRESS);
  const { mintNft, isMinting } = useMinter(CONTRACT_ADDRESS);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <h1 className="header gradient-text">My Epic NFT Collection</h1>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount ? (
            <button
              onClick={mintNft}
              className="cta-button connect-wallet-button"
              disabled={isMinting}
            >
              {isMinting ? "Mining ..." : "Mint NFT"}
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="cta-button connect-wallet-button"
            >
              Connect to Wallet
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
