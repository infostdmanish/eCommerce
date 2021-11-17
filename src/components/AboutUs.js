import React, { useContext } from 'react';
import NavBar from './Navbar';
import AlertContext from '../context/AlertContext';
import AlertComponent from "./CustomAlert";
import Footer from './Footer';

import './AboutUs.css';
function AboutUs() {
    const { alertMsg } = useContext(AlertContext);
    return (
        <>
            < NavBar />
            <AlertComponent alertMsg={alertMsg} />
            <div style={{marginTop: '57px',textAlign:'center'}}>
                <h1>Wellcome to About Us Page</h1>
            </div>
            <div className="footer-about">
                <Footer />
            </div>
        </>
    )
}

export default AboutUs;

