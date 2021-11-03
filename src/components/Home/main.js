import React, { useState } from 'react';
import Gradient from 'rgt';
import AboutUsMainPage from '../About/main';
import Cookies from 'universal-cookie';
import './Main.css';
import FinanceService from '../../services/finance.service';

const cookies = new Cookies();

const MainHomePage = () => {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    let checkifConnectedState = true;
    if(cookies.get('prvt_add') == undefined) {
        if(cookies.get('pblc_add')) {
            checkifConnectedState = false;
        }
    }
    function goToAboutPage() {
        window.location.href = "/about";
    }
    return (
        <div>
            <div className="p-72 mainHomeElements">
                <h1 className="text-5xl text-blue-500 mainTextHome z-10">Grow your channel<br /><span className="text-white"><Gradient dir="left-to-right" from="#9C4EFF" to="#FF006B">with the next-level platform.</Gradient></span></h1>
                { checkifConnectedState ? <button onClick={() => window.location.href = "/signup?as=streamer"} className="homeButtonGradient rounded-lg py-3 px-7">Get Started</button> : null}
                { !checkifConnectedState ? <div><button onClick={() => window.location.href = "/dashboard"} className="homeButtonGradient rounded-lg py-3 px-7">Go to Dashboard</button></div> : null}
                {/* <button onClick={() => window.location.href = "https://discord.gg/6Q6mW46veB"} className="text-white font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px',backgroundColor:'#5677eb'}}>Join Our Discord</button> */}
                {/* <img onClick={goToAboutPage} onMouseEnter={toggleHover} onMouseLeave={toggleHover} className={`illustrationHome ${hovered ? 'setCursorToBtn' : ''}`} src="/homeill2.png" /> */}
                <img src="/homePng.png" className="homeNinjaPng" />
                {/* <img src="/Group.png" className="TextIllustration z-0" /> */}
            </div>
            <AboutUsMainPage />
        </div>
    )
}

export default MainHomePage
