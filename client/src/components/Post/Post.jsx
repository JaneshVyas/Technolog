import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './post.css'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {

  const PF = "http://localhost:5000/images/";

  return (
    <div style={{margin: "1rem"}}>
         <Card style={{ width: '30rem' }}>
         {post.photo && <Card.Img variant="top" src={PF + post.photo} />}
        <Card.Body>
            <div style={{display: "flex", justifyContent: "space-between"}}>
            {post.categories.map((c) => (
            <div key={c._id}>{c.name}</div>
            ))}
            </div>
            <Link  style={{textDecoration: "inherit", color: "inherit"}} to={`/post/${post._id}`} className="link">
            <Card.Title>{post.title}</Card.Title>
            </Link>
            <p>{new Date(post.createdAt).toDateString()}</p>
            <Card.Text className='cardstyle'>
              {post.desc}
            </Card.Text>
            <Button variant="primary">View</Button>
        </Card.Body>
        </Card>
    </div>
  )
}

export default Post