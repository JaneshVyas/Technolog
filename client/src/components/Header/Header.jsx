import React from 'react'
import Image from 'react-bootstrap/Image';
import blogmain from '../../assets/images/blogmain.jpg'

const Header = () => {
  return (
    <div>
      <h1 className='text-center'>Technolog</h1>
      <Image src={blogmain} style={{width: "100%", height: "20rem"}} fluid />
    </div>
  )
}

export default Header