import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './community.css';
import moment from 'moment';

export const Community = () => {
  const [community, setCommunity] = useState({});
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const {user} = useContext(AuthContext);
  const params = useParams()
  const navigate = useNavigate();

  const [isReversed, setIsReversed] = useState(false);

  // Función para manejar el clic y alternar el orden
  const handleMessagesClick = () => {
    setIsReversed((prev) => !prev);
  };

  // Ordena los mensajes dependiendo del estado isReversed
  const messages = isReversed
    ? [...(community?.messages || [])].reverse()
    : community?.messages || [];


  const handleChange = (e) => {
    if (e.target.id === "message") {
      setMessage(e.target.value)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/community/message/" + params.id, {message: message});
    setMessage("")
    await fetchCommunity()
  };


  const handleExit = async (id) => {
    await axios.post("/api/community/exit/" + id, { id: user._id });
    navigate("/")
  }

  const deleteCommunity = async (id) => {
    await axios.delete("/api/community/" + id);
    navigate("/")
  }

  const fetchCommunity = async () =>{
    let res = await axios.get("/api/community/" + params.id);
    if (res.data) {
      setCommunity(res.data);
      const users = [];
      console.log(res.data.users.length)
      if (res.data.users.length === 0) {
        await deleteCommunity(params.id);
      }
      const admin_id = res.data.users[0]
      setIsAdmin(admin_id == user._id)
      for (const user_data of res.data.users) {
          const response = await axios.get("/auth/" + user_data);
          if (user_data === user._id) {
            setIsMember(true)
          }
          users.push(response.data);
      }
      setMembers(users);
    } 

  };

  useEffect(()=>{
    
    
    if(user){
        fetchCommunity();
    }
  }, []);
  
  return (
    <>
    <Navbar/>
      <h1>Comunidad sobre {community.bookName}</h1>
      <div className="card medicine-wrapper ">
      <div className="card-header ">
        {community.name}. Creada en: <Moment
                          className="medicine-date"
                          date={moment(community.createdAt)}
                          format="DD/MM/YYYY"
                        />
      </div>
      {isMember ? <form onSubmit={handleSubmit} className="loginBox">
              <input id="message" value={message} placeholder="message" type="text" onChange={handleChange} required className="loginInput" />
              <button className="loginButton" type='submit'>Enviar</button>
            </form> : ""}
      <ul className="list-group list-group-flush">
      <span onClick={handleMessagesClick}>{isReversed ? "Mensajes en orden de mas nuevos" : "Mensajes en orden de mas antiguos"}</span>
      {messages?.map((message) => (
        <div>
                    
                    <li className="medicine-name-container">
                        {message}
                    </li>
                    </div>
                ))}
      <span>Miembros:</span>
      {members?.map((member) => (
        <div>
                    
                    <li className="medicine-name-container">
                        {member.username}
                    </li>
                    </div>
                ))}
      </ul>
      {isMember ? <button className='btn btn-danger' onClick={()=>handleExit(community._id)}>Salir de comunidad</button> : ""}
      {isAdmin ? <button className='btn btn-danger' onClick={()=>deleteCommunity(community._id)}>Eliminar Comunidad</button> : ""}
    </div>
    </>
  )
}
