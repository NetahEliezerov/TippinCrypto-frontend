import { isArguments, isEmpty, isUndefined } from "lodash";
import Web3 from "web3";
import { ethers } from "ethers";
import axios from "axios";
import { apiConfig } from "../config/api.config";
import { io } from "socket.io-client";
import { errorsConfig } from "../config/errors.config";
import SHIBAabi from '../config/SHIBAabi.json';
import BATabi from '../config/BATabi.json';
import BNBabi from '../config/BNBabi.json';
import wBTCabi from '../config/BTCabi.json';

const socket = io(apiConfig.urls.backendService);

export default class WalletService {

    constructor(web3Wallet) {
        this.web3 = new Web3(apiConfig.urls.mainNetWeb3Provider);
        this.web3Wallet = web3Wallet;
    }

    async getAccount() {
        // TODO: make sure web3Wallet isn't null
        const provider = new ethers.providers.Web3Provider(this.web3Wallet);
        const signer = provider.getSigner();
        if (!isUndefined(signer)) {
            return signer.getAddress();
        } else {
            throw new Error(errorsConfig.errors.notFound);
        }
    };

    async getUserBalance() {
        const account = await this.getAccount();
        const balance = await this.web3.eth.getBalance(account);
        return ethers.utils.formatEther(balance);
    }
    
    async getUserTransactions() {
        const account = await this.getAccount();
        const response = await axios.get(`${apiConfig.urls.backendService}/getRecentTransactions/${account}`);
        if(isEmpty(response.data)) {
            return [];
        }
        return response.data;
    }

    async makeTransaction(amount, streamerKey, currency, tipperName, description, streamer) {
        let gotTrans = true;
        const account = await this.getAccount();
        function showTran() {
            if(tipperName === '') {
                socket.emit('newClientTip', { streamerKey, amount: amount, name: null, address: account, description, date: new Date(), currency: currency });
            } else {
                socket.emit('newClientTip', { streamerKey, amount: amount, name: tipperName, address: account, description, date: new Date(), currency: currency });
            }
            alert("Donation Accepted! Thanks for supporting", streamer.streamerName);
    }
        switch(currency) {
            case 'ETH':
                const transactionParameters = {
                    nonce: '0x00', // ignored by MetaMask
                    gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('6', 'gwei')), // customizable by user during MetaMask confirmation.
                    gas: this.web3.utils.toHex(2100000), // customizable by user during MetaMask confirmation.
                    to: streamerKey, // Required except during contract publications.
                    from: this.web3Wallet.selectedAddress, // must match user's active address.
                    value: ethers.utils.parseUnits(amount, 'ether').toHexString(), // Only required to send ether to the recipient from the initiating external account.
                    chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                };
                this.web3Wallet.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                }).then((txHash) => console.log(txHash)).catch(e => {
                    throw new Error("Tran Canceled.");
                    return false;
                });
                break;
            
            case 'SHIB':
                const shib = new this.web3.eth.Contract(SHIBAabi, '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE');
                this.web3.eth.getTransactionCount(account, async (err, txCount) => {
                    const txObject = {
                        nonce:    this.web3.utils.toHex(txCount),
                        from: account,
                        to:       '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
                        value:    this.web3.utils.toHex(this.web3.utils.toWei('0', 'ether')),
                        gasLimit: this.web3.utils.toHex(2100000),
                        gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('6', 'gwei')),
                        data: shib.methods.transfer(streamerKey, this.web3.utils.toWei(amount)).encodeABI()
                    }
                    this.web3Wallet.request({
                        method: 'eth_sendTransaction',
                        params: [txObject],
                    }).catch(e => {
                        throw new Error("Tran Canceled.");
                        return false;
                    });
                })
                break;

            case 'BAT':
                const batContract = new this.web3.eth.Contract(BATabi, '0x0D8775F648430679A709E98d2b0Cb6250d2887EF');
                this.web3.eth.getTransactionCount(account, async (err, txCount) => {
                    const txObject = {
                        nonce:    this.web3.utils.toHex(txCount),
                        from: account,
                        to:       '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
                        value:    this.web3.utils.toHex(this.web3.utils.toWei('0', 'ether')),
                        gasLimit: this.web3.utils.toHex(2100000),
                        gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('6', 'gwei')),
                        data: batContract.methods.transfer(streamerKey, this.web3.utils.toWei(amount)).encodeABI()
                    }
                    this.web3Wallet.request({
                        method: 'eth_sendTransaction',
                        params: [txObject],
                    }).catch(e => {
                        throw new Error("Tran Canceled.");
                        return false;
                    });
                })
                break;
            
            case 'wBTC':
                    console.log(amount);
                    const wBTCContract = new this.web3.eth.Contract(wBTCabi, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599');
                    this.web3.eth.getTransactionCount(account, async (err, txCount) => {
                        const txObject = {
                            nonce:    this.web3.utils.toHex(txCount),
                            from:     account,
                            to:       '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                            value:    this.web3.utils.toHex(this.web3.utils.toWei('0', 'ether')),
                            gasLimit: this.web3.utils.toHex(2100000),
                            gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('6', 'gwei')),
                            data: wBTCContract.methods.transfer(streamerKey, this.web3.utils.toWei(amount, 'gwei')).encodeABI()
                        }
                        this.web3Wallet.request({
                            method: 'eth_sendTransaction',
                            params: [txObject],
                        }).then((txHash) => {
                            showTran();
                        }).catch(e => {
                            alert("Donation Canceled.");
                            return false;
                        });
                    })
                    break;
            
            case 'BNB':
                const bnbContract = new this.web3.eth.Contract(BNBabi, '0xB8c77482e45F1F44dE1745F52C74426C631bDD52');
                this.web3.eth.getTransactionCount(account, async (err, txCount) => {
                    const txObject = {
                        nonce:    this.web3.utils.toHex(txCount),
                        from: account,
                        to:       '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
                        value:    this.web3.utils.toHex(this.web3.utils.toWei('0', 'ether')),
                        gasLimit: this.web3.utils.toHex(2100000),
                        gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('6', 'gwei')),
                        data: bnbContract.methods.transfer(streamerKey, this.web3.utils.toWei(amount)).encodeABI()
                    }
                    this.web3Wallet.request({
                        method: 'eth_sendTransaction',
                        params: [txObject],
                    }).catch(e => {
                        throw new Error("Tran Canceled.");
                        return false;
                    });
                })
                break;
        }
    }

}