import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

import './SignUp.css';

import AlertComponent from "./CustomAlert";
import AlertContext from '../context/AlertContext';

import Footer from './Footer';

const SignUp = (props) => {

   //using alert context
    const {showAlert} = useContext(AlertContext);
    const  {alertMsg}  = useContext(AlertContext);

    const history = useHistory();
    const [validated, setValidated] = useState(false);

    const [credentials, setCredentials] = useState({ fname: "", lname: "", email: "", contactno: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        const { fname, lname, email, contactno, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {

            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fname, lname, email, contactno, password })
        });
        const json = await response.json()
       // console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            clearState();
            history.push("/signup");
            showAlert("Account created Succesfully Created ", "success");
        } else {
           showAlert("Invalid Credentials", "danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const initialState = { fname: "", lname: "", email: "", contactno: "", password: "" };
    const clearState = () => {
        setCredentials({ ...initialState });
    };
    return (
        <>
            <Navbar />
            <AlertComponent alertMsg={alertMsg}/>
            <div className="form-container">
                <h3>User Registration</h3>
                <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
                {/* <Form className="login-form" onSubmit={handleSubmit}> */}
                    <Form.Group className="mb-3" controlId="formBasicFirstname" >
                        <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control type="text" name="fname" value={credentials.fname} onChange={onChange} size='sm' required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastname" >
                        <Form.Label>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control type="text" name="lname" value={credentials.lname} onChange={onChange} size='sm' required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email address <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control type="email" name="email" value={credentials.email} onChange={onChange} size='sm' required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicContact" >
                        <Form.Label>Contact No <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control type="text" name="contactno" value={credentials.contactno} onChange={onChange} size='sm' required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control type="password" name="password" value={credentials.password} onChange={onChange} size='sm' required />
                    </Form.Group>
                   
                    <Button className="btn-create" type="submit" variant="dark">
                        Create Account
                    </Button>

                </Form>

            </div>
            <div className="footer-signup">
                <Footer />
            </div>
            
        </>
    )
}

export default SignUp;
