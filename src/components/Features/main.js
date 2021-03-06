import React from 'react';
import { FcCurrencyExchange, FcLock, FcApproval } from 'react-icons/fc';
import Feature from './Feature';
import './Main.css';

const MainFeaturesPage = () => {
    return (
        <div>
            <center>
                <h1 className="text-5xl pt-20 text-white" style={{fontFamily:'Poppins',fontWeight:'bold'}}>Features</h1>
                <div className="mt-24">
                    <div style={{ paddingRight: '50%' }} className="feature"><Feature FeatureName="Decentralized" FeatureDescription={ <span>All the transactions<br />made anonymously</span> } StartGradient="blue-900" EndGradient="blue-500" Icon={FcLock} NameColor="blue-300" /></div>
                    <div style={{ paddingRight: '0', marginTop: '-11.25%' }} className="feature"><Feature FeatureName="Currencies" FeatureDescription={ <span>Users can tip<br />up to 5 currencies</span> } StartGradient="purple-900" EndGradient="purple-500" Icon={FcCurrencyExchange} NameColor="purple-300"  /></div>
                    <div style={{ paddingLeft: '50%', marginTop: '-11.25%' }} className="feature"><Feature FeatureName="Easy to use" FeatureDescription={ <span>Easy-to-use<br />User Interface</span> } StartGradient="yellow-400" EndGradient="yellow-300" Icon={FcApproval} NameColor="yellow-100" /></div>
                </div>
            </center>
        </div>
    )
}

export default MainFeaturesPage
