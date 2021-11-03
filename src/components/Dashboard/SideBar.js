import React from 'react'
import './Main.css';
const SideBar = () => {
    return (
        <div class="sidenav">
        <a href="/dashboard">Overview</a>
        <a href="/dashboard/analytics">Analytics</a>
        <a href="/dashboard/alertbox">Alert Box</a>
        <a href="/">Back to Home</a>
        {/* <a href="#contact">Contact</a> */}
    </div>
    )
}

export default SideBar
