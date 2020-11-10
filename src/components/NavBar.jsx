import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
    return <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="container">
            <div className="navbar-brand">
            <h1 className="title navbar-item">
                Zenika Cities weather
            </h1>
            </div>
            <div className="navbar-menu">
            <h2 className="navbar-item has-text-white">
                The best weather app in React
            </h2>
            </div>
            <div className="navbar-menu navbar-end">
                <Link className="navbar-item" to="/create">
                Create city
                </Link>
            </div>
        </div>
    </nav>;
}

export default NavBar
