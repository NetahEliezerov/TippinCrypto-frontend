import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Gradient from 'rgt';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io("https://153.92.222.12:443");

const MainAlertWidget = () => {
    const [ethPrice, setEthPrice] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});
    const { streamerKey } = useParams();

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

    return (
        <div>
            { showAlert ? <div className="pt-60"> <p className="text-center pb-3 text-blue-400 text-3xl" style={{fontFamily:'Poppins', fontWeight: '600'}}>{parseInt(ethPrice) * parseFloat(alertInfo.amount)}$</p>
            <h1 className="text-center text-5xl" style={{fontFamily:'Poppins', fontWeight: '600'}}><Gradient dir="left-to-right" from="#9C4EFF" to="#FF006B">{alertInfo.name} Tipped {alertInfo.amount} ETH! </Gradient></h1>
            <p className="text-center pt-6 text-green-400" style={{fontFamily:'Poppins', fontWeight: '600'}}>{alertInfo.description}</p> </div> : null }
        </div>
    )
}

export default MainAlertWidget
