import React, { useContext, useState } from 'react'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Context } from "../../context/Context";

const Write = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div>
      {file && (
            <div style={{margin: "2%", display: "flex", justifyContent: "center"}}>
              <Image src={URL.createObjectURL(file)} style={{width: "80%", height: "20rem"}} fluid />
            </div>
      )}
      <div style={{margin: "3%"}}>
        <div>
        <Form  onSubmit={handleSubmit}>
          <Button style={{margin: "2%"}} variant="success" type="submit">
            Publish
          </Button>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Post Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Control style={{fontSize: "3rem", border: "none"}} type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
          </Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Tell your Story..."
              style={{ margin: "1%", height: '100rem', fontSize: "1.5rem", border: "none" }}
              onChange={e=>setDesc(e.target.value)}
            />
        </Form>
        </div>
      </div>
    </div>
  )
}

export default Write