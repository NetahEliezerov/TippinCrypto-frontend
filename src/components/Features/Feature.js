import React from 'react'

const Feature = (props) => {
    return (
        <div className={`box-content h-64 w-60 p-4 bg-gradient-to-b from-${props.StartGradient} to-${props.EndGradient} rounded-lg`}>
            <h1 className={`text-center text-${props.NameColor} pt-5`} style={{fontFamily:'Poppins',fontWeight:'700',fontSize:'25px'}}>{props.FeatureName}</h1>
            <p className="text-center text-white pt-5" style={{fontFamily:'Poppins',fontWeight:'300',fontSize:'17px'}}>{props.FeatureDescription}</p>
            <props.Icon size={75} color={'white'} style={{ marginLeft: 'auto', marginRight: 'auto' }} className="mt-6" />
        </div>
    )
}

export default Feature
