import React,{useContext} from 'react';
//import { Image, Accordion, Toast, ToastContainer } from 'react-bootstrap';
import { Image, Accordion } from 'react-bootstrap';

import './LandingPage.css';

import Footer from './Footer';

import Navbar from './Navbar';
import CardItem from './CardItem';
//import bannerlogo from './logo-banner.png';
import ecommerceBanner from './ecommerce-banner.png';

import {FaFileInvoiceDollar} from "react-icons/fa";
import {SiZendesk} from "react-icons/si";

import AlertContext from '../context/AlertContext';
import AlertComponent from "./CustomAlert";


function LandingPage(props) {

    const  {alertMsg}  = useContext(AlertContext);
    //const { products, onAdd, toastShow, setShowToast, cartItems } = props;
    const { products, onAdd, cartItems } = props;

    return (
        <>
            <Navbar countCartItems={cartItems.length}  />
            <AlertComponent alertMsg={alertMsg}/>
            
            <div className="content">
                <Image src={ecommerceBanner} className="bannerLogo" />

                <div className="main-content">
                    <div className='sideContainer'>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><FaFileInvoiceDollar  size="1.3em"/> Price</Accordion.Header>
                                <Accordion.Body>
                                    <label htmlFor="customRange2" className="form-label">Price: $50- $1000</label>
                                    <input type="range" className="form-range" min="50" max="1000" id="customRange2" />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><SiZendesk size="1.3em"/> Size</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sizeList'>
                                        <li>S</li>
                                        <li>M</li>
                                        <li>L</li>
                                        <li>XL</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="rightContainer">
                        {products.map((product) => (
                            <CardItem key={product.id} product={product} onAdd={onAdd}></CardItem>
                        ))
                        }
                    </div>
                </div>
                {/* <ToastContainer position="top-end" className="p-3">
                    <Toast show={false} onClose={() => setShowToast(false)} bg='success' delay={2000} autohide >
                        <Toast.Header >
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Successfull</strong>
                            <small>1mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Item added to Cart.</Toast.Body>
                    </Toast>
                </ToastContainer> */}
            </div>
            <div className="footer">
                <Footer/>
            </div>
            </>
    )

}
export default LandingPage;
