import React from 'react';
import '../../styles/header.css';

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <div className="logo-icon">🚀</div>
                    <h1 className="logo-text">HaveJobs<span className="dot">.</span></h1>
                </div>
            </div>
        </header>
    );
};
