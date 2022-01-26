import styles from "../styles/index.css";
import useWallet from "../hooks/useWallet";
import useMinter from "~/hooks/useMinter";
import { useEffect, useState } from "react";
import { LoaderFunction, useLoaderData } from "remix";

const TWITTER_HANDLE = "jakeherp";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;
const RINKEBY_CHAIN_ID = "0x4";
const CONTRACT_ADDRESS = "0x0c5976e639c4705061984adA7Ab07df8Cc6796CC";
const COLLECTION = "squarenft-u2jqambaup";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    `https://testnets-api.opensea.io/api/v1/assets?collection=${COLLECTION}`
  ).then((data) => data.json());

  const data = response.assets.map((asset: any) => ({
    id: asset.id,
    tokenId: asset.token_id,
    sales: asset.num_sales,
    image: asset.image_url,
    name: asset.name,
    description: asset.description,
    url: asset.permalink,
    transferFee: asset.transfer_fee || 0,
  }));

  return data;
};

export default function Index() {
  const [hasWallet, setHasWallet] = useState(true);
  const [isCorrectChain, setIsCorrectChain] = useState(true);

  const { connectWallet, currentAccount } = useWallet(CONTRACT_ADDRESS);
  const { mintNft, isMinting } = useMinter(CONTRACT_ADDRESS);
  const assets = useLoaderData();

  useEffect(() => {
    const { ethereum } = window as any;

    if (!ethereum) setHasWallet(false);

    const isCorrectChain = async () => {
      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== RINKEBY_CHAIN_ID) setIsCorrectChain(false);
    };
    isCorrectChain();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <h1 className="header gradient-text">My Epic NFT Collection</h1>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {!hasWallet && (
            <p className="warn-text">
              You need an Ethereum Wallet to proceed. Please install{" "}
              <a href="https://metamask.io/" target="_blank" rel="noopener">
                Metamask
              </a>
            </p>
          )}
          {!isCorrectChain && (
            <p className="warn-text">
              You are not connected to the Rinkeby Test Network.
            </p>
          )}
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
        <section id="assets" className="grid">
          {assets.map(({ id, tokenId, image, name, url, transferFee }: any) => (
            <a href={url} target="_blank" rel="noopener" key={id}>
              <div>
                <img src={image} alt={name} />
                <h2>{name}</h2>
                <p>
                  Token #{tokenId} &bull; Transfer Fee: {transferFee} $ETH
                </p>
              </div>
            </a>
          ))}
        </section>
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
