import React from 'react'

const AboutUs = () => {
    return (
        <div>
            <h1 className="text-center text-5xl pt-36 text-white" style={{fontFamily:'Poppins',fontWeight:'bold'}}>About Us</h1>
            <p className="text-center text-1xl pt-10 text-white"  style={{fontFamily:'Poppins',fontWeight:'400'}}>
            {/* TippinCrypto is a platform that helps you as a streamer grow your channel with crypto donations.<br />
            Our team believes that crypto is a new smart way to interact with viewers annonymusly and easly.
            Today as s */}
            TippinCrypto is a brand new way to support streamers with digital assets.<br />
            It's allows viewers to tip streamers with crypto-currencies.<br />
            Our team believes that crypto is a new smart way to interact with viewers annonymusly and easly.
            {/* Lately, We've seen someone in twitch puts his crypto addresses in the description<br />
            and says in stream the people who send him donations.<br />
            We were thinking: Why not to make this process easier?<br />
            Theres currently many stream donation providers but no one supports crypto-currencies. */}
            </p>
        </div>
    )
}

export default AboutUs
