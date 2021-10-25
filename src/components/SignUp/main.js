import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { ethers } from 'ethers';
import Gradient from 'rgt';
import Cookies from 'universal-cookie';
import Web3 from 'web3';

const cookies = new Cookies();

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function putDotsAfterLongString(string) {
    return string.replace(string.substring(24, 190), '...');
}

const signMessage = async ({ setSignError, message }) => {
    try {
      console.log({ message });
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
  
      return {
        message,
        signature,
        address
      };
    } catch (err) {
        setSignError(err.message);
    }
};

const MainSignUpPage = () => {
    const { ethereum } = window;
    const query = useQuery();
    const clientType = query.get('as');
    const [signError, setSignError] = useState();
    const [showMetamaskAccount, setShowMetamaskAccount] = useState(false);
    const [showTippinCryptoAccount, setShowTippinCryptoAccount] = useState(false);
    const [streamingSig, setStreamingSig] = useState('');
    const [streamerName, setStreamerName] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [signature, setSignature] = useState('');
    const [showLoginSelections, setShowLoginSelections] = useState(true);
    const web3 = new Web3('https://mainnet.infura.io/v3/1be468ea59274a5ea108fd6cd8df58cf');

    const signUpWithTippinBtn = async () => {
        let startStreamerNamePrompt = prompt("How are you called?", "MrBeast6000");
        if(startStreamerNamePrompt != null) {
            let streamerNamePrompt = startStreamerNamePrompt.toLowerCase();
            setStreamerName(streamerNamePrompt);
            const newAcc = web3.eth.accounts.create();
            const signedTran = newAcc.sign('TippinCryptoSig');
            const streamerSignatureFull = newAcc.sign(streamerNamePrompt);
            setStreamingSig(streamerSignatureFull.signature);
            console.log(streamerSignatureFull);
            setSignature(signedTran.signature);
            setPublicKey(newAcc.address);
            setPrivateKey(newAcc.privateKey);
            setShowTippinCryptoAccount(true);
            setShowLoginSelections(false);
        }
    }

    const signUpWithMetamaskBtn = async () => {
        setShowLoginSelections(false);
        let metamaskInstalled;
        if(typeof ethereum !== undefined) {
            metamaskInstalled = true;
        } else {
            metamaskInstalled = false;
        }

        if(metamaskInstalled) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            let startStreamerNamePrompt = prompt("How are you called?", "MrBeast6000");
            const account = accounts[0];
            if(account && startStreamerNamePrompt != null) {
                let streamerNamePrompt = startStreamerNamePrompt.toLowerCase();
                const signedTran = await signMessage({setSignError, message: 'TippinCryptoSig'});
                const streamerSignatureFull = await signMessage({setSignError, message: streamerNamePrompt});
                console.log(signError, streamerSignatureFull);
                if(!signError) {
                    setStreamingSig(streamerSignatureFull.signature);
                    setStreamerName(streamerNamePrompt);
                    setPublicKey(streamerSignatureFull.address);
                    setShowMetamaskAccount(true);
                    // window.location.href = "/";
                }
            }
        }
        
    }


    if(cookies.get('prvt_add') != undefined) {
        window.location.href = "/";
    }

    return (
        <center>
            { showLoginSelections ? <div id="loginSelection">
                <button onClick={signUpWithTippinBtn} className="bg-green-400 hover:bg-white hover:text-green-400 text-gray-900 font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Create new account with TippinCrypto</button><br />
                <button onClick={signUpWithMetamaskBtn} className="bg-yellow-500 hover:bg-white hover:text-yellow-500 text-white font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Signup with MetaMask</button><br />
            </div> : null }

            { showTippinCryptoAccount ? <div>
                <h1 className="text-green-400 text-4xl pt-24" style={{fontFamily:'Poppins', fontWeight: '800'}}>
                    <Gradient dir="left-to-right" from="#9C4EFF" to="#FF006B">
                        Private Key
                        <br />
                        { <Gradient dir="left-to-right" from="#149911" to="#1EFC1E">
                            <span className="text-3xl">{privateKey}</span>
                            </Gradient> }<br /><br />
                            Signature
                            <br />
                            { <Gradient dir="left-to-right" from="#149911" to="#1EFC1E">
                                <span className="text-2xl">{signature}</span>
                                </Gradient> }
                            {/* <br /><br />
                            Streaming Signature
                            <br />
                            { <Gradient dir="left-to-right" from="#149911" to="#1EFC1E">
                                <span className="text-2xl">{streamingSig}</span>
                                </Gradient> } */}
                            <br /><br />
                            Alert Link
                            <br />
                            { <Gradient dir="left-to-right" from="#149911" to="#1EFC1E">
                                <a href={`http://localhost:3000/${publicKey}/alert`} className="text-2xl">{`http://localhost:3000/${publicKey}/alert`}</a>
                                </Gradient> }
                            <br /><br />
                            Tipping Page Link
                            <br />
                            { <Gradient dir="left-to-right" from="#149911" to="#1EFC1E">
                                <a href={`http://localhost:3000/${publicKey}/${streamingSig}/${streamerName}`} className="text-2xl" style={{textDecoration: 'underline'}}>{putDotsAfterLongString(`http://localhost:3000/${publicKey}/${streamingSig}/${streamerName}`)}</a>
                                </Gradient> }
                            </Gradient>
                            </h1>
                            <button onClick={() => { window.location.href = "/"; cookies.set('prvt_add', privateKey); cookies.set('userProvider', 'TippinCrypto') }} className="bg-green-400 hover:bg-green-600 hover:text-white text-gray-900 font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Continue</button>
                </div> : null }

                { showMetamaskAccount ? <div>
                    <h1 className="text-green-400 text-4xl pt-24" style={{fontFamily:'Poppins', fontWeight: '800'}}>
                    <Gradient dir="left-to-right" from="#9C4EFF" to="#FF006B">
                            <br /><br />
                            Alert Link
                            <br />
                            { <Gradient dir="left-to-right" from="#149911" to="#1EFC1E">
                                <a href={`http://localhost:3000/${publicKey}/alert`} className="text-2xl">{`http://localhost:3000/${publicKey}/alert`}</a>
                                </Gradient> }
                            <br /><br />
                            Tipping Page Link
                            <br />
                            { <Gradient dir="left-to-right" from="#149911" to="#1EFC1E">
                                <a href={`http://localhost:3000/${publicKey}/${streamingSig}/${streamerName}`} className="text-2xl" style={{textDecoration: 'underline'}}>{putDotsAfterLongString(`http://localhost:3000/${publicKey}/${streamingSig}/${streamerName}`)}</a>
                                </Gradient> }
                            </Gradient>
                            </h1>
                            <button onClick={() => { cookies.set('pblc_add', publicKey); cookies.set('userProvider', 'MetaMask'); window.location.href = "/" }} className="bg-green-400 hover:bg-green-600 hover:text-white text-gray-900 font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Continue</button>
                </div> : null }
        </center>
    )
}

export default MainSignUpPage
