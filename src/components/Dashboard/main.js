import React, { useState, useEffect } from 'react';
import { BiExpandAlt } from 'react-icons/bi';
import Web3 from 'web3';
import {Collapse} from 'react-collapse';
import Gradient from 'rgt';
import { ethers } from 'ethers';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Transaction from './Transaction';
import Analytics from './Analytics';

const web3 = new Web3('https://mainnet.infura.io/v3/1be468ea59274a5ea108fd6cd8df58cf');
const cookies = new Cookies();

function putDotsAfterLongString(string) {
    return string.replace(string.substring(6, 39), '...');
}

function putDotsAfter5String(string) {
    return string.replace(string.substring(3, string), '...');
}

const MainDashboardPage = () => {
    const {ethereum} = window;
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [streamerKey, setStreamerKey] = useState('');
    const [ethAccounts, setEthAccounts] = useState([]);
    const [ethPrice, setEthPrice] = useState(0);
    let checkifConnectedState = true;
    if(cookies.get('prvt_add') == undefined) {
        if(cookies.get('pblc_add')) {
            checkifConnectedState = false;
        }
    }
    if(checkifConnectedState) {
        window.location.href = "/";
    }
    useEffect(() => {
        if(cookies.get('userProvider')) {
            checkProvider();
            getBal();
            getTransactions();
            getEthPrice();
        }
    }, []);
    
  
    const getBal = async () => {
        // console.log(parseFloat(await web3.eth.getBalance(streamerKey)));
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setEthAccounts(accounts);
        const balance = await web3.eth.getBalance(accounts[0]);
        const formatedEthers = ethers.utils.formatEther(balance);
        setBalance(parseFloat(formatedEthers.substring(0, 5)));
    };


    const getEthPrice = async () => {
        const ethereumPrice = (await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ILS')).data;
        setEthPrice(ethereumPrice.USD);
    }


    const checkProvider = async () => {
        const userProviderIsMetamask = cookies.get('userProvider') == 'MetaMask';
        if(userProviderIsMetamask) {
                setStreamerKey(cookies.get('pblc_add'));
            } else if(cookies.get('userProvider') == 'TippinCrypto') {
                const signedAcc = web3.eth.accounts.privateKeyToAccount(cookies.get('prvt_add'));
                setStreamerKey(signedAcc.address);
        }
        
    }

    const getTransactions = () => {
        axios.get(`https://153.92.222.12:443/getRecentTransactions/${cookies.get('pblc_add')}`).then((res) => {
            setTransactions(res.data);
        });
    };
    let todaysRevenue = 0;
    transactions.forEach((value, i) => {
        const currentDate = new Date()
        const transactionDate = new Date(value.date);
        const diffTime = Math.abs(currentDate - transactionDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const diffMin = Math.ceil(diffTime / (60 * 1000));
        if(diffMin < 1440) {
            todaysRevenue += parseFloat(value.amount);
        };
    });

    transactions.reverse();

    return (
        <div>
            
            <div className="shadow sm:rounded-md sm:overflow-hidden p-52">
                <div className="px-4 py-5 space-y-6 sm:p-6 rounded-lg" style={{width:'65rem', height:'20rem', backgroundColor: '#292A33'}}>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <h1 className="text-4xl p-5 text-white" style={{fontFamily:'Poppins',fontWeight:'600'}}>Balance</h1>
                            <h1 className="text-6xl pl-5 pt-7" style={{fontFamily:'Poppins',fontWeight:'600'}}><Gradient dir="left-to-right" from="#9C4EFF" to="#FF006B">{balance} ETH</Gradient></h1>
                        </div>
                        <div>
                            <div style={{marginLeft:'-5rem'}}>
                                <h1 className="text-4xl pt-5 text-white" style={{fontFamily:'Poppins',fontWeight:'600',marginLeft:'-5rem'}}>Today's Revenue</h1>
                                <h1 className="text-6xl pt-12" style={{fontFamily:'Poppins',fontWeight:'600',marginLeft:'-5rem'}}><Gradient dir="left-to-right" from="#1EFC1E" to="#20A31D">{todaysRevenue} ETH</Gradient></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/*            <Analytics transactions={transactions} /> */}
            <div className="shadow sm:rounded-md sm:overflow-hidden pl-52" style={{marginTop:'-10rem'}}>
                <div className="sm:p-6 rounded-lg" style={{width:'65rem', height:'20%', backgroundColor: '#292A33'}}>
                        <h1 className="text-4xl p-5 text-white" style={{fontFamily:'Poppins',fontWeight:'600'}}><Gradient dir="left-to-right" from="#CF5BAD" to="#ED8D69">Recent Tips</Gradient></h1>
                        { transactions.map((element) => <Transaction name={element.name} amount={element.amount} description={element.description} date={element.date} />) }
                </div>
            </div>
        </div>
    )
}

export default MainDashboardPage
