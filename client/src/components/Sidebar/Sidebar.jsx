import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div style={{flex: "3", margin: "1rem"}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((c) => (
            <tr key={c._id}>
              <td><Link to={`/?cat=${c.name}`} style={{color: "inherit", textDecoration: "none"}}>{c.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Sidebar