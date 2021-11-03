import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Gradient from 'rgt';
import Cookies from 'universal-cookie';
import Transaction from './Transaction';
import FinanceService from '../../services/finance.service';
import './Main.css'
import WalletService from '../../services/wallet.service';
const web3 = new Web3('https://mainnet.infura.io/v3/1be468ea59274a5ea108fd6cd8df58cf');
const cookies = new Cookies();

function putDotsAfterLongString(string) {
    return string.replace(string.substring(6, 39), '...');
}

function putDotsAfter5String(string) {
    return string.replace(string.substring(3, string), '...');
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const MainDashboardPage = () => {
    const {ethereum} = window;
    const walletService = new WalletService(ethereum);
    const [transactions, setTransactions] = useState([]);
    const [streamerKey, setStreamerKey] = useState('');
    const [ethAccounts, setEthAccounts] = useState([]);
    const [ethPrice, setEthPrice] = useState(0);
    const [coinPrices, setCoinPrices] = useState({});
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
            getPrices();
        }
    }, []);

    const getPrices = async () => {
        const shibPrice = await FinanceService.getCryptoCurrencyPrice('shib', 'usd');
        const wBTCPrice = await FinanceService.getCryptoCurrencyPrice('wbtc', 'usd');
        const BATPrice = await FinanceService.getCryptoCurrencyPrice('bat', 'usd');
        setCoinPrices({"shib": shibPrice, "wbtc": wBTCPrice, "bat": BATPrice});
    }

    
    async function getEthPrice() {
        setEthPrice(await FinanceService.getCryptoCurrencyPrice('ethereum', 'usd'));
    };
    
  
    const getBal = async () => {
        setEthAccounts(await walletService.getAccount());
    };




    const checkProvider = async () => {
        const userProviderIsMetamask = cookies.get('userProvider') == 'MetaMask';
        if(userProviderIsMetamask) {
                setStreamerKey(cookies.get('pblc_add'));
            } else if(cookies.get('userProvider') == 'TippinCrypto') {
                const signedAcc = web3.eth.accounts.privateKeyToAccount(cookies.get('prvt_add'));
                setStreamerKey(signedAcc.address);
        }
        
    }

    const getTransactions = async () => {
        setTransactions(await walletService.getUserTransactions());
        console.log(transactions);
    };
    let todaysRevenue = 0;
    let balance = 0;
    transactions.forEach((value, i) => {
        const currentDate = new Date()
        const transactionDate = new Date(value.date);
        const diffTime = Math.abs(currentDate - transactionDate);
        const diffMin = Math.ceil(diffTime / (60 * 1000));
        if(diffMin < 1440) {
            switch(value.currency) {
                case 'ETH':
                    todaysRevenue += parseInt(parseInt(ethPrice) * parseFloat(value.amount));
                    break;
        
                case 'SHIB':
                    todaysRevenue += parseFloat(parseFloat(coinPrices.shib) * parseFloat(value.amount));
                    break;

                case 'wBTC':
                    todaysRevenue += parseFloat(parseFloat(coinPrices.wbtc) * parseFloat(value.amount));
                    break;

                case 'BAT':
                    todaysRevenue += parseFloat(parseFloat(coinPrices.bat) * parseFloat(value.amount));
                    break;
            }
        };
        switch(value.currency) {
            case 'ETH':
                balance += parseInt(parseInt(ethPrice) * parseFloat(value.amount));
                break;
    
            case 'SHIB':
                balance += parseFloat(parseFloat(coinPrices.shib) * parseFloat(value.amount));
                break;
            
            case 'wBTC':
                balance += parseFloat(parseFloat(coinPrices.wbtc) * parseFloat(value.amount));
                break;

            case 'BAT':
                balance += parseFloat(parseFloat(coinPrices.bat) * parseFloat(value.amount));
                break;
        }
    });

    transactions.reverse();

    return (
        <div>
            <div className="balanceDiv">
                <div className="px-4 py-5 space-y-6 sm:p-6 rounded-lg" style={{width:'65rem', height:'20rem', backgroundColor: '#292A33'}}>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <h1 className="text-4xl p-5 text-white" style={{fontFamily:'Poppins',fontWeight:'600'}}>Balance</h1>
                            <h1 className="text-6xl pl-5 pt-7" style={{fontFamily:'Poppins',fontWeight:'600'}}><Gradient dir="left-to-right" from="#9C4EFF" to="#FF006B">{numberWithCommas(String(balance).substring(0, 8))}$</Gradient></h1>
                        </div>
                        <div>
                            <div style={{marginLeft:'-5rem'}}>
                                <h1 className="text-4xl pt-5 text-white" style={{fontFamily:'Poppins',fontWeight:'600',marginLeft:'-5rem'}}>Today's Revenue</h1>
                                <h1 className="text-6xl pt-12" style={{fontFamily:'Poppins',fontWeight:'600',marginLeft:'-5rem'}}><Gradient dir="left-to-right" from="#1EFC1E" to="#20A31D">{numberWithCommas(todaysRevenue)}$</Gradient></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/*            <Analytics transactions={transactions} /> */}
            <div className="recentTips">
                <div className="sm:p-6 rounded-lg" style={{width:'65rem', height:'20%', backgroundColor: '#292A33'}}>
                        <h1 className="text-4xl p-5 text-white hhh" style={{fontFamily:'Poppins',fontWeight:'600'}}><Gradient dir="left-to-right" from="#CF5BAD" to="#ED8D69">Recent Tips</Gradient></h1>
                        { transactions.map((element) => <Transaction name={element.name} amount={element.amount} description={element.description} date={element.date} currency={element.currency} />) }
                </div>
            </div>
        </div>
    )
}

export default MainDashboardPage
