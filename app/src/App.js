import React, { useEffect } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  /**
   * function is checking the window object in DOM to see 
   * if the Phantom wallet extension has injected the solana object
   * If we do have a solana object, we can also check to see if it's a Phantom Wallet
   */
  const checkIfWalletIsConnected = async () => {
    try {
      //checking the window object in our DOM for the solana object
      const { solana } = window;

      if(solana) {
        if(solana.isPhantom) {
          console.log('Phantom wallet found!');
        }
        /**
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet
         */
        const response = await solana.connect({ onlyIfTrusted: true});
        console.log(
          'Connected with Public Key: ',
          response.publicKey.toString()
        );
      } else {
        alert('Solana object not found! Get a Phantom Wallet');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * define method so code doesn't break
   * 
   */
  const connectWallet = async () => {};

  /**
   * Render this UI when the user hasn't connected 
   * their wallet to our app yet.
   */

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet 
    </button>
  );

  /*
   * checks to see if Phantom wallet has been connected
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/**Render your connect to wallet button right here */}
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
