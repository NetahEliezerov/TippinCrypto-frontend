import React, {useState,useEffect} from 'react';
import Gradient from 'rgt';
import axios from 'axios';
import FinanceService from '../../services/finance.service';
// import ReactCSSTransitionGroup from 'react-transition-group';

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const Transaction = (props) => {
    const [expandedViewed, setExpandedViewed] = useState(false);
    const [ethPrice, setEthPrice] = useState(0);
    const [coinPrices, setCoinPrices] = useState({});
    const wholeTrans = props.amount + props.name;
    const expanded = props.name + props.amount;

    useEffect(() => {
        getEthPrice();
        getPrices();
    }, []);

    const getEthPrice = async () => {
        const ethereumPrice = await FinanceService.getCryptoCurrencyPrice('ethereum', 'usd');
        setEthPrice(ethereumPrice);
    }

    const getPrices = async () => {
        const shibPrice = await FinanceService.getCryptoCurrencyPrice('shib', 'usd');
        const wBTCPrice = await FinanceService.getCryptoCurrencyPrice('wbtc', 'usd');
        const BATPrice = await FinanceService.getCryptoCurrencyPrice('bat', 'usd');
        setCoinPrices({"shib": shibPrice, "wbtc": wBTCPrice, "bat": BATPrice});
    }

    const toggleExpandView = () => {
        if(expandedViewed) {
            document.getElementById(wholeTrans).style.animationName = "toggleOffExpandViewAni";
            document.getElementById(wholeTrans).style.animationDuration = '300ms';
            setTimeout(() => {
                document.getElementById(wholeTrans).style.height = '88px';
            }, 200);
            setExpandedViewed(false);
        } else {
            document.getElementById(wholeTrans).style.animationName = "toggleOnExpandViewAni";
            document.getElementById(wholeTrans).style.animationDuration = '300ms';
            setTimeout(() => {
                document.getElementById(wholeTrans).style.height = '225px';
                setExpandedViewed(true);
                document.getElementById(expanded).style.animationName = "fadeIn";
                document.getElementById(expanded).style.animationDuration = '200ms';
            }, 200);
        }
        if(document.getElementById(expanded)) {
            // document.getElementById(wholeTrans).style.animationName = "toggleOnExpandViewAni";
            // document.getElementById(wholeTrans).style.animationDuration = '300ms';
            // setTimeout(() => {
            //     document.getElementById(wholeTrans).style.height = '225px';
            // }, 400);
        } else {
            document.getElementById(wholeTrans).style.height = '88px';
        }
    }
    const currentDate = new Date()
    const transactionDate = new Date(props.date);
    const diffTime = Math.abs(currentDate - transactionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const diffMin = Math.ceil(diffTime / (60 * 1000)); 
    let timeAgo = ``;
    if(diffMin > 60) {
        if(diffMin > 1440) {
            timeAgo = `${diffDays} days ago`;
        } else {
            timeAgo = `${Math.ceil(diffTime / (1000 * 60 * 60))} hours ago`;
        }
    } else {
        timeAgo = `${diffMin} minutes ago`;
    } 
    let amountInDollars;
    switch(props.currency) {
        case 'ETH':
            amountInDollars = parseInt(parseInt(ethPrice) * parseFloat(props.amount));
            break;
        
        case 'SHIB':
            amountInDollars = parseFloat(parseFloat(coinPrices.shib) * parseFloat(props.amount));
            break;

        case 'wBTC':
            amountInDollars = parseFloat(parseFloat(coinPrices.wbtc) * parseFloat(props.amount));
            break;

        case 'BAT':
            amountInDollars = parseFloat(parseFloat(coinPrices.bat) * parseFloat(props.amount));
            break;
    }

    return (
        <div>
            <div className="rounded-lg mt-5" style={{backgroundColor:'#171821', height:'88px'}} id={wholeTrans}>
                <h1 className="text-3xl pl-5 pt-7" style={{fontFamily:'Poppins',fontWeight:'600'}}>
                    <Gradient dir="left-to-right" from="#665F9B" to="#4988CE"><span className="ml-5">{props.name}</span></Gradient>
                        <span className="pl-5" style={{fontSize:'20px'}}><Gradient dir="left-to-right" from="#EAE095" to="#7FB167">{props.amount + ` ${props.currency}`} </Gradient></span>
                        <button className="buttonGradient rounded-lg py-1 px-3" onClick={toggleExpandView}>Expand View</button>
                </h1>
                { expandedViewed ? <div>
                    <div className="pl-11 pt-6" id={expanded}>
                        <p className="text-white" style={{fontFamily:'Poppins',fontWeight:'400'}}>{props.description}</p>
                        <p className="text-white mr-20" style={{float:'right', fontFamily:'Poppins', fontWeight:'400', fontSize: '20px'}}>{timeAgo}</p>
                        <h1 className="text-3xl pt-5" style={{color: '#1EFC1E', fontFamily: 'Poppins', fontWeight: '500'}}>{numberWithCommas(amountInDollars)}$</h1>
                    </div>
                </div> : null }
            </div>
        </div>
    )
}

export default Transaction
