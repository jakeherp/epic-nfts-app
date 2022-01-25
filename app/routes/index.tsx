const TWITTER_HANDLE = "jakeherp";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

export default function Index() {
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  return (
    <div className="container">
      <div className="header-container">
        <p className="header gradient-text">My Epic NFT Collection</p>
        <p className="sub-text">
          Each unique. Each beautiful. Discover your NFT today.
        </p>
        {renderNotConnectedContainer()}
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
  );
}
