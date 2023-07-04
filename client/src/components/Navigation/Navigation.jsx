import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom'

const Navigation = () => {

  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="mr-auto">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/"><Nav.Link>About</Nav.Link></LinkContainer>
            <LinkContainer to="/"><Nav.Link>Contact</Nav.Link></LinkContainer>
            <LinkContainer to="/write"><Nav.Link>Write</Nav.Link></LinkContainer>
            {user && <LinkContainer to="/"><Nav.Link onClick={handleLogout}>Logout</Nav.Link></LinkContainer>}
          </Nav>
          <Nav className='mr-auto'>
            {user ?
              (
                <Container>
                  <Row>
                    <Col>
                      <Link to='/settings'><Image style={{width: "3rem", height: "3rem"}} alt='Profile Pic' src={user.profilePic} rounded /></Link>
                    </Col>
                  </Row>
                </Container>
              ) :
              (
                <>
                  <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                  <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
                </>
              )
            }
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation