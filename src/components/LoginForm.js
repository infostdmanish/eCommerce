import React, { useState,useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LoginForm.css";
import { useHistory } from 'react-router';


import AlertContext from '../context/AlertContext';

const LoginForm = (props) => {

//using alert context
const {showAlert} = useContext(AlertContext);


  const [credentials, setCredentials] = useState({email:"", password:""});
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {

      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password })
    });
    const json = await response.json();
    //console.log(json);
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      history.push("/aboutUs");
      showAlert("Logged in Successfully", "success");
    }else{
      history.push("/aboutUs");
      showAlert("Credentials are Invalid", "danger");
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}
  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Username or Email address <span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control type="email" name="email" onChange={onChange} value={credentials.email} size='lg' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control type="password" name="password" onChange={onChange} value={credentials.password} size='lg' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <div className="flex-container">
          <Form.Check type="checkbox" label="Remember me" />
          <Button variant="link" className="btn-forget ">Forgot Password?</Button>
        </div>

      </Form.Group>
      <Button className="btn-submit" type="submit"  variant="dark">
        LOGIN
      </Button>
      <div class="link-container">
        <Link className="sign-link" to="/signup">Register Now!</Link>
      </div>
    </Form>
  )

}

export default LoginForm;