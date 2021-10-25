import React from 'react'

const Main404Page = () => {
    return (
        <div>
            <h1 className="text-red-500 text-9xl text-center pt-60" style={{fontFamily:'Poppins',fontWeight:'600'}}>404</h1>
            <p className="text-red-300 text-3xl text-center pt-5" style={{fontFamily:'Poppins',fontWeight:'400'}}>Page not found</p>
            <center><button onClick={() => {window.location.href="/"}} className="bg-white hover:bg-green-400 hover:text-white text-green-600 font-bold py-3 px-6 rounded transition-all duration-200 mt-10" style={{fontFamily:'Poppins',fontWeight:'400',fontSize:'16px'}}>Go Home</button></center>
        </div>
    )
}

export default Main404Page
