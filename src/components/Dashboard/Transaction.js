import React, {useState,useEffect} from 'react';
import Gradient from 'rgt';
import axios from 'axios';
// import ReactCSSTransitionGroup from 'react-transition-group';
const Transaction = (props) => {
    const [expandedViewed, setExpandedViewed] = useState(false);
    const [ethPrice, setEthPrice] = useState(0);
    const wholeTrans = props.amount + props.name;
    const expanded = props.name + props.amount;

    useEffect(() => {
        getEthPrice();
    }, []);

    const getEthPrice = async () => {
        const ethereumPrice = (await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ILS')).data;
        setEthPrice(ethereumPrice.USD);
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
        timeAgo = `${Math.ceil(diffTime / (1000 * 60 * 60))} hours ago`;
    } else {
        timeAgo = `${diffMin} minutes ago`;
    }

    return (
        <div>
            <div className="rounded-lg mt-5" style={{backgroundColor:'#171821', height:'88px'}} id={wholeTrans}>
                <h1 className="text-3xl pl-5 pt-7" style={{fontFamily:'Poppins',fontWeight:'600'}}>
                    <Gradient dir="left-to-right" from="#665F9B" to="#4988CE"><span className="ml-5">{props.name}</span></Gradient>
                        <span className="pl-5" style={{fontSize:'20px'}}><Gradient dir="left-to-right" from="#EAE095" to="#7FB167">{props.amount} ETH </Gradient></span>
                        <button className="buttonGradient rounded-lg py-1 px-3" onClick={toggleExpandView}>Expand View</button>
                </h1>
                { expandedViewed ? <div>
                    <div className="pl-11 pt-6" id={expanded}>
                        <p className="text-white" style={{fontFamily:'Poppins',fontWeight:'400'}}>{props.description}</p>
                        <p className="text-white mr-20" style={{float:'right', fontFamily:'Poppins', fontWeight:'400', fontSize: '20px'}}>{timeAgo}</p>
                        <h1 className="text-3xl pt-5" style={{color: '#1EFC1E', fontFamily: 'Poppins', fontWeight: '500'}}>{parseInt(parseInt(ethPrice) * parseFloat(props.amount))}$</h1>
                    </div>
                </div> : null }
            </div>
        </div>
    )
}

export default Transaction
