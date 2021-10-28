import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { ethers } from 'ethers';
import Cookies from 'universal-cookie';
import Web3 from 'web3';

const cookies = new Cookies();

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
  
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  

const MainLoginPage = () => {
    const query = useQuery();
    const clientType = query.get('as');
    const [showForm, setShowForm] = useState(false);
    const [privateKey, setPrivateKey] = useState('');
    const [signature, setSignature] = useState('');
    const [showLoginSelections, setShowLoginSelections] = useState(true);
    const web3 = new Web3('https://mainnet.infura.io/v3/1be468ea59274a5ea108fd6cd8df58cf');

    const signInWithTippinBtn = async () => {
        // const newAcc = web3.eth.accounts.create();
        // cookies.set('prvt_add', newAcc.privateKey);
        const signedUser = web3.eth.accounts.privateKeyToAccount(privateKey);
        const isValid = await verifyMessage({
            message: 'TippinCryptoSig',
            address: signedUser.address,
            signature: signature
        })
        if(isValid == true) {
            cookies.set('prvt_add', signedUser.privateKey);
            cookies.set('userProvider', 'TippinCrypto');
            window.location.href = '/';
        } else {
            alert('Invalid Login Parameters');
        }
    }

    const loginWithMetamask = async () => {
        if(typeof window.ethereum !== 'undefined'){
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            cookies.set('userProvider', 'MetaMask');
            cookies.set('pblc_add', await signer.getAddress())
            window.location.href = "/";
        } else {
            alert('MetaMask Not Installed!');
            window.location.href = "/";
        }
      
    }

    if(cookies.get('pub_address') != undefined || cookies.get('prvt_add') != undefined) {
        window.location.href = "/";
    }

    const TippinCryptoLoginForm = () => <div class="w-full max-w-xs pt-60">
        <div class="mb-4">
        <input class="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="private_key"  onChange={(event) => setPrivateKey(event.target.value)} placeholder="Private Key" />
        <br />
        <input class="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="signature" onChange={(event) => setSignature(event.target.value)} placeholder="Signature" />
        </div>
        <div class="mb-6">
        </div>
        <button class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-300" type="button" onClick={ signInWithTippinBtn }>
            Log In
        </button>

        <p class="text-center text-gray-300 text-xs">
        You'll be signed in with any parameters,<br />make sure you're on the right one<br /><br />&copy;2021 TippinCrypto. All rights reserved.
        </p>
    </div>;
    return (
        <center>
            { showLoginSelections ? <div id="loginSelection">
                <button onClick={() => { setShowForm(true); setShowLoginSelections(false) }} className="bg-green-400 hover:bg-green-600 hover:text-white text-gray-900 font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Login With TippinCrypto</button><br />
                <button onClick={() => { loginWithMetamask(); setShowLoginSelections(false) }} className="bg-green-400 hover:bg-green-600 hover:text-white text-gray-900 font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Login With MetaMask</button><br />
            </div> : null }
            { showForm ? <TippinCryptoLoginForm /> : null }
        </center>
    )
}

export default MainLoginPage
