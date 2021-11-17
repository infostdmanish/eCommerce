import React, { useState, useEffect } from 'react'

import LoginForm from './LoginForm';
import './Navbar.css';
import { Navbar, Nav, NavDropdown, Container, Button, Modal, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { FaUserCircle, FaSearch } from "react-icons/fa";

import { MdShoppingCart } from "react-icons/md";



function NavBar(props) {

    let location = useLocation();
    useEffect(() => {
        //console.log(location.pathname)
    }, [location])

    const { countCartItems} = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal className="loginModel" show={show} onHide={handleClose} centered={true} >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>{<LoginForm />}</Modal.Body>
               
            </Modal>

            <Navbar className="fixed-top" expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand to="#home">eCommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} to="/home">Home</Link>
                            <Nav.Link to="/product">Product</Nav.Link>
                            <NavDropdown title="Category" id="basic-nav-dropdown">
                                <NavDropdown.Item to="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item to="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item to="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Link className={`nav-link ${location.pathname === "/aboutUs" ? "active" : ""}`} to="/aboutUs">About Us</Link>


                        </Nav>
                        {/* <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success" ><FaSearch /></Button>
                        </Form> */}
                        <Button variant="dark" onClick={handleShow}><FaUserCircle size="1.5em" color="gray" /></Button>
                        <Link className={`nav-link ${location.pathname === "/Checkout" ? "active" : ""}`} to='/Checkout'> <MdShoppingCart size="1.5em" color="gray" title="Cart" /> {countCartItems ? (<Badge className='badgeColor'>{countCartItems} </Badge>) : ('')} </Link>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )

}
export default NavBar;
