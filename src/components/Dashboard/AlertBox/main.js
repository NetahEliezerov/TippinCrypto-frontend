import React from 'react'
import './Main.css';
import WalletService from '../../../services/wallet.service';


const MainAlertBoxPage = () => {
    const walletService = new WalletService(window.ethereum);

    const openStyle = async (style) => {
        const account = await walletService.getAccount();
        window.location.href = `/${account}/alert/${style}`;
    }

    return (
        <div>
            <div className="alertSettings">
                <h1 className="alertWidgetTitle">Alert Widget Settings</h1>
                <div className="alertParameterSettings">
                    <img src="/blackwhite.png" onClick={() => openStyle('blackwhite')} className="alertStyles blackwhite" />
                    <img src="/bluestyle.png" onClick={() => openStyle('bluestyle')} className="alertStyles bluestyle" />
                    <img src="/defaultstyle.png" onClick={() => openStyle('default')} className="alertStyles defaultstyle" />
                    <img src="/greenstyle.png" onClick={() => openStyle('greenstyle')} className="alertStyles greenstyle" />
                    <img src="/redstyle.png" onClick={() => openStyle('redstyle')} className="alertStyles redstyle" />
                </div>
            </div>
        </div>
    )
}

export default MainAlertBoxPage
