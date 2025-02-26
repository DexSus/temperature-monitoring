import React from "react";
import "./style.css";
import Lottie from "lottie-react";
import logoAnimation from "../../assets/json/temperature.json";

export const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <Lottie animationData={logoAnimation} className="header-logo" />
                
                <h1 className="header-title">Моніторинг температури</h1>
                
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="/admin" className="nav-link">Про пристрій</a>
                        </li>
                        <li className="nav-item">
                            <a href="/profile" className="nav-link">Часті питання</a>
                        </li>
                        <li className="nav-item">
                            <a href="/profile" className="nav-link">Підтримати</a>
                        </li>
                    </ul>
                </nav>
            </div>            
        </header>
    );
};