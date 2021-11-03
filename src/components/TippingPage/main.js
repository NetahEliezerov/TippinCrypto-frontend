import React, {useState} from 'react';
import { useParams } from 'react-router';
import { FiCopy } from 'react-icons/fi';
import { io } from 'socket.io-client';
import axios from 'axios';
import WalletService from '../../services/wallet.service';
import Web3 from 'web3';
import { apiConfig } from '../../config/api.config';
import Gradient from 'rgt';
import { ethers } from "ethers";
// import

const socket = io(apiConfig.urls.backendService);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function putDotsAfterLongString(string) {
    return string.replace(string.substring(6, 39), '...');
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

const MainTippingPage = () => {
    const streamer = useParams();
    const { ethereum } = window;
    const [donateCurrency, setDonateCurrency] = useState('ETH');
    const [amountToTip, setAmountToTip] = useState('');
    const [tipperName, setTipperName] = useState('');
    const [description, setDescription] = useState('');
    const { streamerKey } = useParams();
    const web3 = new Web3(ethereum);
    const walletService = new WalletService(ethereum);
    verifyMessage({message:streamer.streamerName,address:streamer.streamerKey,signature:streamer.streamerSig}).then((res) => {
        console.log(res)
        if(res == false) {
            window.location.href = "/404";
        }
    });
    // console.log(ethereum.networkVersion);
    if(typeof window.ethereum !== 'undefined') {
        if(ethereum.networkVersion != '1' && !apiConfig.modes.testMode) {
            alert('Invalid Network.');
            window.open("about:blank", "_self");
            window.close();
        }
    }

    const tipStreamer = async () => {
        const tipperAddress = (await ethereum.request({ method: 'eth_requestAccounts' }))[0];
        if(amountToTip === '') {
            alert("You need to type amount of ethers to tip.");
        } else {
            walletService.makeTransaction(amountToTip, streamerKey, donateCurrency, tipperName, description, streamer, tipperAddress);
        }
    }
    function setToETH() {
        setDonateCurrency('ETH');
    }

    function setToSHIB() {
        setDonateCurrency('SHIB');
    }

    function setToBAT() {
        setDonateCurrency('BAT');
    }

    function setToBNB() {
        setDonateCurrency('BNB');
    }

    function setToWBTC() {
        setDonateCurrency('wBTC');
    }

    return (
        <div>
            <div className="p-60">
                {/* <img src={`https://avatars.dicebear.com/api/initials/${useParams().streamerName}.svg`} className="w-20 rounded-full" /> */}
                <h1 className="text-6xl pt-3" style={{fontFamily: 'Poppins', fontWeight: '600'}}><Gradient dir="left-to-right" from="#9C4EFF" to="#FF006B">{capitalizeFirstLetter(useParams().streamerName)}</Gradient></h1>
                <br />
                <br />
                <div class="mb-4">
                    <input class="mt-5 rounded w-72 py-2 px-3 text-white bg-gray-800" id="signature" required onChange={(event) => setTipperName(event.target.value)} placeholder="Name" />
                    <br />
                    <br />
                    <div class="inline-flex">
                        <button onClick={setToWBTC} class="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-l duration-200">
                            wBTC
                        </button>
                        <button onClick={setToETH} class="bg-blue-500 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 duration-200">
                            ETH
                        </button>
                        <button onClick={setToSHIB} class="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 duration-200">
                            SHIB
                        </button>
                        <button onClick={setToBNB} class="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 duration-200">
                            BNB
                        </button>
                        <button onClick={setToBAT} class="bg-pink-600 hover:bg-pink-400 text-gray-800 font-bold py-2 px-4 rounded-r duration-200">
                            BAT
                        </button>
                    </div><br />
                    <input class="mt-5 rounded w-72 py-2 px-3 text-white bg-gray-700" id="public_key" required onChange={(event) => setAmountToTip(event.target.value)} placeholder={`Amount To Tip (In ${donateCurrency})*`} />
                    <br />
                    <input class="mt-5 rounded w-72 h-20 py-2 px-3 text-white bg-gray-600" id="public_key" required onChange={(event) => setDescription(event.target.value)} placeholder="Description" />
                </div>
                <button onClick={tipStreamer} className="bg-green-400 hover:bg-white hover:text-green-400 text-gray-900 font-bold py-3 px-6 rounded transition-all duration-200 mt-5" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Tip</button>

            </div>
            <div id="howtouse" style={{marginTop:'-42.5rem',marginLeft:'90rem'}}>
                <h1 className="text-5xl text-white" style={{fontFamily:'Poppins',fontWeight:'bold'}}>How to Tip</h1>
                <p className="text-white pt-10" style={{fontFamily:'Poppins',fontWeight:'400'}}>To tip, you need to install MetaMask Wallet.<br />then, when tipping you'll need to accept payment in MetaMask</p>
            </div>
        </div>
    )
}

export default MainTippingPage;
