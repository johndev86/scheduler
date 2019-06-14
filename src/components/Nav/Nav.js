import React from 'react';
import { Link } from 'react-router-dom';
import PortalIcon from '../PortalIcon/PortalIcon';
import './Nav.css';

const Nav = ({showProfile, isSignedIn, loadUser, signOut, loading}) => {
    let portal = <div>Loading...</div>;
    if (!loading) {
        
        portal = <Link to="/signin">Sign in</Link>;
        if (isSignedIn) {
            portal = <PortalIcon showProfile={showProfile} loadUser={loadUser} signOut={signOut}/>;
        }
    }
        return (
            <nav>
                <ul className="nav-content">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/staff">Staff</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li className="nav-last">
                        {portal}
                    </li>
                </ul>
            </nav>
        );
}

export default Nav;