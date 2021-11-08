import React, { useState, useEffect } from 'react';
import { apiConfig } from '../../config/api.config';
import { useParams } from 'react-router';
import Gradient from 'rgt';
import styles from './settings.json';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io(apiConfig.urls.backendService);

const MainAlertWidget = () => {
    const [ethPrice, setEthPrice] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});
    const { streamerKey, style } = useParams();

    useEffect(() => {
        getEthPrice();
    }, []);

    const getEthPrice = async () => {
        const ethereumPrice = (await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ILS')).data;
        setEthPrice(ethereumPrice.USD);
    }
    // console.log(streamerKey);
    socket.on(streamerKey, (res) => {
        setAlertInfo(res);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    })
    const currentStyle = styles[style];

    return (
        <div>
            { showAlert ? <div className="pt-60"> <p className={`text-center pb-3 ${currentStyle.amountTextColor} text-3xl`} style={{fontFamily:'Poppins', fontWeight: '600'}}>{parseInt(ethPrice) * parseFloat(alertInfo.amount)}$</p>
            <h1 className="text-center text-5xl" style={{fontFamily:'Poppins', fontWeight: '600'}}><Gradient dir="left-to-right" from={currentStyle.nameTextGradient[0]} to={currentStyle.nameTextGradient[1]}>{alertInfo.name} Tipped {alertInfo.amount} ETH! </Gradient></h1>
            <p className={`text-center pt-6 ${currentStyle.descriptionTextColor}`} style={{fontFamily:'Poppins', fontWeight: '600'}}>{alertInfo.description}</p> </div> : null }
            {/* { true ? <div className="pt-60"> <p className={`text-center pb-3 ${currentStyle.amountTextColor} text-3xl`} style={{fontFamily:'Poppins', fontWeight: '600'}}>5$</p>
            <h1 className="text-center text-5xl" style={{fontFamily:'Poppins', fontWeight: '600'}}><Gradient dir="left-to-right" from={currentStyle.nameTextGradient[0]} to={currentStyle.nameTextGradient[1]}>John Tipped 5 ETH! </Gradient></h1>
            <p className={`text-center pt-6 ${currentStyle.descriptionTextColor}`} style={{fontFamily:'Poppins', fontWeight: '600'}}>nive</p> </div> : null } */}
        </div>
    )
}

export default MainAlertWidget
