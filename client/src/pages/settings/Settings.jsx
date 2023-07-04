import React, { useContext, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Context } from '../../context/Context';
import axios from 'axios'

const Settings = () => {

    const { user, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(null);  

    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
          userId: user._id,
          username,
          email,
          password,
        };
        if (file) {
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.profilePic = filename;
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          const res = await axios.put("/users/" + user._id, updatedUser);
          setSuccess(true);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "UPDATE_FAILURE" });
        }
      };

  return (
    <div style={{display: "flex"}}>
        <div style={{flex: "9", margin: "1%"}}>
            <h1>Update your account</h1>
            <Form style={{margin: "2%"}} onSubmit={handleSubmit}>
            <Button style={{margin: "1%"}} variant="danger">
                    Delete
                </Button>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Container style={{margin: "1%"}}>
                    <Row>
                        <Col xs={6} md={4}>
                        <Image src={file ? URL.createObjectURL(file) : PF+user.profilePic} rounded />
                        </Col>
                    </Row>
                    </Container>
                    <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit">
                    Update
                </Button>
                {success && (
                    <span
                    style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                    >
                    Profile has been updated...
                    </span>
                )}
                </Form>
        </div>
        <Sidebar />
    </div>
  )
}

export default Settings