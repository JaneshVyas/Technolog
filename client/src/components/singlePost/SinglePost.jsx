import React, { useContext, useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from "../../context/Context";
import Form from 'react-bootstrap/Form';

const SinglePost = () => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/"
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div style={{flex: "9"}}>
      {post.photo && (
          <Image src={PF + post.photo} style={{margin: "1rem", width: "95%", height: "20rem"}} fluid />
        )}
        {updateMode && (
          <Button style={{margin: "2%"}} variant="success" onClick={handleUpdate}>
            Update
          </Button>
        )}
        {updateMode ? (
          <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control style={{fontSize: "3rem", border: "none"}} type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          </Form.Group>
        ) : (
          <div style={{textAlign: "center"}}>
        <h1>{title}</h1>
        {post.username === user?.username && (
          <div>
                      <Button style={{width: "5rem", margin: "1rem"}} variant="primary" onClick={() => setUpdateMode(true)}>Edit</Button>
                      <Button style={{width: "5rem", margin: "1rem"}} variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
            )}
      </div>
        )}
      <div style={{display: "flex", justifyContent: "space-between", margin: "1%"}}>
        <Link to={`/?user=${post.username}`} style={{color: "inherit", textDecoration: "inherit"}}>
          <h6>Author: {post.username}</h6>
        </Link>
        <h6>{new Date(post.createdAt).toDateString()}</h6>
      </div>
      {updateMode ? (
          <Form.Control
          as="textarea"
          placeholder="Tell your Story..."
          style={{ margin: "1%", height: '100rem', fontSize: "1.5rem", border: "none" }}
          onChange={e=>setDesc(e.target.value)}
          value={desc}
          />
        ) : (
          <p style={{margin: "1%", fontSize: "1.2rem"}}>
            {desc}
          </p>
        )}
    </div>
  )
}

export default SinglePost