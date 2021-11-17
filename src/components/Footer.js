import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import {FaFacebook,FaTwitter,FaInstagram,FaLinkedin} from "react-icons/fa";


function Footer() {
    return (
        <>
            <div className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify">Ecommerce <i>CODE WANTS TO BE SIMPLE </i> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Categories</h6>
                            <ul className="footer-links">
                                <li><Link to="#">Cameras</Link></li>
                                <li><Link to="#">Computers</Link></li>
                                <li><Link to="#">Clothings</Link></li>
                                <li><Link to="#">Hardwares</Link></li>
                                <li><Link to="#">Mobile Phones</Link></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">Contact Us</Link></li>
                                <li><Link to="#">Contribute</Link></li>
                                <li><Link to="#">Privacy Policy</Link></li>
                                <li><Link to="#">Sitemap</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by
                                 Manish Shakya
                            </p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><Link className="facebook" to="#"><FaFacebook/></Link></li>
                                <li><Link className="twitter" to="#"><FaTwitter/></Link></li>
                                <li><Link className="dribbble" to="#"><FaInstagram/></Link></li>
                                <li><Link className="linkedin" to="#"><FaLinkedin/></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer
