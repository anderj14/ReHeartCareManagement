import React, { useState } from 'react'
import Icon from "../../Images/Icon.svg";
import Profile from "../../Images/profile.png";
import Dashboard from "../../Images/dashboard.svg";
import Transactions from "../../Images/transactions.svg";
import Performance from "../../Images/performance.svg";
import News from "../../Images/news.svg";
import { useLocation } from 'react-router-dom';

export default function Sidebar({ closeMenu, handleCloseMenu }: any) {
    const location = useLocation();

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"} >
            <div className={closeMenu === false ? "logoContainer" : "logoContainer active"}>
                <img src={Icon} alt="icon" className='logo' />
                <h2 className='title'>CardioData</h2>
            </div>

            <div className={closeMenu === false ? "burgerContainer" : "burgerContainer active"}>
                <div className="burgerTrigger" onClick={() => { handleCloseMenu() }}></div>
                <div className="burgerMenu"></div>
            </div>

            <div className={closeMenu === false ? "profileContainer" : "profileContainer active"}>
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello, Dr John</p>
                    {/* <p>johndoe@example.com</p> */}
                </div>
            </div>

            <div className={closeMenu === false ? "contentsContainer" : "contentsContainer active"}>
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <img src={Dashboard} alt="dashboard" />
                        <a href="/">Dashboard</a>
                    </li>
                    <li className={location.pathname === "/patients" ? "active" : ""}>
                        <img src={Transactions} alt="transactions" />
                        <a href="/patients">Patients</a>
                    </li>
                    <li className={location.pathname === "/about" ? "active" : ""}>
                        <img src={Performance} alt="performance" />
                        <a href="/about">About</a>
                    </li>
                    <li className={location.pathname === "/contact" ? "active" : ""}>
                        <img src={News} alt="News" />
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div >
    )
}
