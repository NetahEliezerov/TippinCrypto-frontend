import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Navbar = () => {
    let checkifConnectedState = false;
    if(cookies.get('prvt_add') || cookies.get('pblc_add')) {
        console.log(2);
        checkifConnectedState = true;
    }
    return (
        <nav className="text-white" style={{backgroundColor:'#3E404D'}}>
  <div class="mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>TippinCrypto</h1>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <a href="/" class="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</a>
	    { !checkifConnectedState ? <a href="/login" class="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a> : null }
            { checkifConnectedState ? <a href="/dashboard" class="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a> : null }
            <a href="/about" class="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="/howitswork" class="hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">How it works</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</nav>
    )
}

export default Navbar
