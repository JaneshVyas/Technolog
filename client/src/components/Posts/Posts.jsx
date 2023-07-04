import React from 'react'
import Post from '../Post/Post'

const Posts = ({ posts }) => {
  return (
    <div style={{flex: "9", display: "flex", flexWrap: "wrap"}}>
      {posts.map((p)=>(
        <Post key={p._id} post={p} />
      ))}
    </div>
  )
}

export default Posts