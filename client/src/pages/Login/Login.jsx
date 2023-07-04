import React, { useContext, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context';

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("/auth/login", {
            email: userRef.current.value,
            password: passwordRef.current.value,
          });
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
          alert(err.response.data);
          dispatch({ type: "LOGIN_FAILURE" });
        }
      };


  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Form style={{width: "50rem", marginTop: "10%"}} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={userRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
            </Form.Group>
            <Button style={{width: "5rem"}} variant="success" type="submit" disabled={isFetching}>
                Submit
            </Button>
            <br />
            <Link to="/register">
            <Button style={{marginTop: "1%", width: "5rem"}} variant="primary">
                Register
            </Button>
            </Link>
            </Form>
    </div>
  )
}

export default Login