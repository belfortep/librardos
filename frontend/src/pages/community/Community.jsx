import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './community.css';

export const Community = () => {
  const [community, setCommunity] = useState({});
  const [book, setBook] = useState({});
  const [members, setMembers] = useState([]);
  const {user} = useContext(AuthContext);
  const params = useParams()
  const navigate = useNavigate();



  const fetchBook = async (id) => {
    let book_res = await axios.get("/api/book/" + id);
        console.log(book_res)
        if (book_res.data !== null) {
            setBook(book_res.data);
        }
  }

  const handleExit = async (id) => {
    await axios.post("/api/community/exit/" + id, { id: user._id });
    navigate("/")
  }

  useEffect(()=>{
    
    const fetchCommunity = async () =>{
      let res = await axios.get("/api/community/" + params.id);
      if (res.data) {
        console.log(res.data)
        setCommunity(res.data);
        await fetchBook(res.data.book)
        const users = [];
        for (const user of res.data.users) {
            const response = await axios.get(`/auth/${user}`);
            users.push(response.data);
        }
        setMembers(users);
      } 

    };
    if(user){
        fetchCommunity();
    }
  }, []);
  
  return (
    <>
    <Navbar/>
      <h1>Comunidad sobre {book.title}</h1>
      <div className="card medicine-wrapper ">
      <div className="card-header ">
        {community.name}
      </div>
      <ul className="list-group list-group-flush">
      <span>Miembros:</span>
      {members.map((member) => (
        <div>
                    
                    <li className="medicine-name-container">
                        {member.username}
                    </li>
                    </div>
                ))}
      </ul>
      <button className='btn btn-danger' onClick={()=>handleExit(community._id)}>🗑️</button>
    </div>
    </>
  )
}
