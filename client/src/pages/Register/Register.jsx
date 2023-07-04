import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("/auth/register", {
            username,
            email,
            password,
          });
          if(res.status===200) res.data && window.location.replace("/login");
        } catch (err) {
          alert(err.response.data);
        }
      };

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Form style={{width: "50rem", marginTop: "10%"}} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button style={{width: "5rem"}} variant="success" type="submit">
                Submit
            </Button>
            <br />
            <Link to="/login">
            <Button style={{marginTop: "1%", width: "5rem"}} variant="primary">
                Login
            </Button>
            </Link>
            </Form>
    </div>
  )
}

export default Register