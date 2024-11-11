import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './community.css';
import moment from 'moment';

export const Community = () => {
  const [community, setCommunity] = useState({});
  const [messages, setMessages] = useState([]);
  const [responseMessages, setResponseMessages] = useState([])
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [replyingTo, setReplyingTo] = useState(undefined)
  const {user} = useContext(AuthContext);
  const params = useParams()
  const navigate = useNavigate();

  const [isReversed, setIsReversed] = useState(false);

  const handleMessagesClick = () => {
    setIsReversed((prev) => !prev);
    setMessages((prevMessages) => [...prevMessages].reverse());
  };

  const handleChange = (e) => {
    if (e.target.id === "message") {
      setMessage(e.target.value)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/community/message/" + params.id, {username: user.username, message: message, father_id: replyingTo});
    setMessage("")
    setReplyingTo(undefined)
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

  const handleReplyMessage = async (id) => {
    setReplyingTo(id)
    if (id === replyingTo) {
      setReplyingTo(undefined)
    }
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
      const api_messages = []
      const response_messages = []
      for (const message_id of res.data.messages) {
        const response = await axios.get("/api/message/" + message_id)
        if (response.data.father_id === undefined) {
          api_messages.push(response.data)
        } else {
          response_messages.push(response.data)
        }

      }

      setMembers(users);
      if (isReversed) {
        api_messages.reverse()
      }
      setMessages(api_messages)
      setResponseMessages(response_messages)
    } 

  };

  useEffect(()=>{
    
    
    if(user){
        fetchCommunity();
    }
  }, []);
  
  return (
    <>
        <div className="container mt-5">
          <h1 className="text-primary">Comunidad sobre {community.bookName}</h1>
          <div className="card">
            <div className="card-header bg-secondary text-white">
            {community.name}. Creada el: <Moment date={moment(community.createdAt)} format="DD/MM/YYYY" />
            </div>
            <div className="card-body">
            {isMember && (
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group">
                  <input
                    id="message"
                    value={message}
                    placeholder={replyingTo ? "Respondiendo..." : "Escribe un mensaje"}
                    type="text"
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  <button className="btn btn-primary" type="submit">
                    Enviar
                  </button>
                </div>
              </form>
            )}
            <h5 className="card-title">Mensajes</h5>
            <span onClick={handleMessagesClick} className="btn btn-link">
              {isReversed ? "Mensajes en orden de más nuevos" : "Mensajes en orden de más antiguos"}
            </span>
            <ul className="list-group list-group-flush mb-4">
              {messages?.map((message, index) => (
                <>
                <li onClick={() => handleReplyMessage(message._id)}  style={{
            backgroundColor: replyingTo === message._id ? "#c3c3c3" : "white", // Cambia el color según el estado
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
          }}  key={index} className="list-group-item">
                  {message.username}: <span >{message.message}</span> - <Moment style={{color:"gray"}}  date={moment(message.createdAt)} format="DD/MM/YYYY" />
                </li>
                {responseMessages.filter((response) => response.father_id === message._id).map((response) => (
                  <li key={index} className="list-group-item" style={{ marginLeft: "25px" }}>
                  {response.username}: <span>{response.message}</span> - <Moment style={{color:"gray"}}  date={moment(response.createdAt)} format="DD/MM/YYYY" />
                </li>
                ))}
                </>

              ))}
            </ul>
            <h5 className="card-title">Miembros</h5>
            <ul className="list-group list-group-flush mb-4">
              {members?.map((member, index) => (
                <li key={index} className="list-group-item">
                  {member.username}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer">
            {isMember && (
              <button className="btn btn-danger me-2" onClick={() => handleExit(community._id)}>
                Salir de comunidad
              </button>
            )}
            {isAdmin && (
              <button className="btn btn-danger" onClick={() => deleteCommunity(community._id)}>
                Eliminar Comunidad
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}
