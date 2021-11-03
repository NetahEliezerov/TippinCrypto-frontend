import axios from 'axios';
export default class FinanceService {

    static async getCryptoCurrencyPrice(coin, fiat) {
        console.log(currencies[coin], currencies[fiat])
        const res = (await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${currencies[coin]}&tsyms=${currencies[fiat]}`)).data;
        return res[currencies[fiat]];
    }

    a() {
        this.getCryptoCurrencyPrice(currencies.bitcoin,currencies.usd)
    }

}

export const currencies = {
    "usd":"USD",
    "ils":"ILS",
    "ethereum":"ETH",
    "bitcoin":"BTC",
    "bat": "BAT",
    "shib": "SHIB",
    "bnb": "BNB",
    "wbtc": "wBTC"
}