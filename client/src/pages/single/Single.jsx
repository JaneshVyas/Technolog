import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import SinglePost from '../../components/singlePost/SinglePost'

const Single = () => {
  return (
    <div style={{ display: "flex"}}>
        <SinglePost />
        <Sidebar />
    </div>
  )
}

export default Single