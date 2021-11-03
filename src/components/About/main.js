import React from 'react'
import MainFeaturesPage from '../Features/main';
import AboutUs from './AboutUs';
import Team from './Team';
import './Main.css'

const MainAboutPage = () => {
    return (
        <div>
            <img className="aboutUsImg" src="415.png" />
            {/* <AboutUs /> */}
            {/* <div className="animationAbout"><video autoPlay loop muted>
                        <source src="startanimation.webm" type="video/webm" />
                    </video>
                </div> */}
            <MainFeaturesPage />
            <div className="pb-40"></div>
            {/* <Team /> */}
        </div>
    )
}

export default MainAboutPage
