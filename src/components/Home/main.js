import React from 'react';
import Gradient from 'rgt';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const MainHomePage = () => {
    let checkifConnectedState = true;
    if(cookies.get('prvt_add') == undefined) {
        if(cookies.get('pblc_add')) {
            checkifConnectedState = false;
        }
    }
    return (
        <div>
            <div className="p-72">
                <h1 className="text-5xl text-blue-500" style={{fontFamily:'Poppins',fontWeight:'bold'}}>Welcome to <Gradient dir="left-to-right" from="#CF5BAD" to="#ED8D69">TippinCrypto</Gradient>.</h1>
                <p className="pt-5 text-blue-400 text-2xl" style={{fontFamily:'Poppins',fontWeight:'300'}}>Tip streamers with digital currencies</p>
                { checkifConnectedState ?
                    <div><button onClick={() => window.location.href = "/signup?as=streamer"} className="bg-green-400 hover:bg-white hover:text-green-400 text-gray-900 font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Get Started</button><br />
                    {/* <button onClick={() => window.location.href = "/signup?as=viewer"} className="bg-white hover:bg-green-400 hover:text-white text-green-600 font-bold py-3 px-6 rounded transition-all duration-200 mt-5" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>I'm a Viewer</button> */}
                    </div>
                : null}
                <button onClick={() => window.location.href = "https://discord.gg/6Q6mW46veB"} className="text-white font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px',backgroundColor:'#5677eb'}}>Join Our Discord</button>
                
            </div>
        </div>
    )
}

export default MainHomePage
