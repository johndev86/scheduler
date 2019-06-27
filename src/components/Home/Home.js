import React from 'react';
import './Home.css';

const Home = () => (
    <div>
        <main id="home">
            <div className="bg"></div>
            <h1>Scheduler App</h1>
            <p>Please use email/password below for demo purposes</p>
            <p>
                <label>Staff logins: </label>
                <ul>
                    <li>john@email.com//password</li>
                    <li>laura@email.com//password</li>
                </ul>
            </p>
            <p>
                <label>Cilent login: </label>
                <ul>
                    <li>client@email.com//password</li>
                </ul>
            </p>
        </main>
    </div>
);

export default Home;