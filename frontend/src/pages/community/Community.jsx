import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer'
import CommunityNameChange from '../../components/NameChangeWindow/NameChangeWindow';
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './community.css';
import moment from 'moment';

export const Community = () => {
  const [community, setCommunity] = useState({});
  const [messages, setMessages] = useState([]);
  const [responseMessages, setResponseMessages] = useState([])
  const { loading, error, dispatch } = useContext(AuthContext);
  const [communities, setCommunities] = useState([])
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [replyingTo, setReplyingTo] = useState(undefined);
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState("");
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

  const modifyCommunityName = async (id) => {
    // const newName = prompt("Ingrese el nuevo nombre de la comunidad:");
    console.log(newName)
    if (newName) {
      await axios.patch("/api/community/" + id, { name: newName });
    }
  }

  const handleReplyMessage = async (id) => {
    setReplyingTo(id)
    if (id === replyingTo) {
      setReplyingTo(undefined)
    }
  }

  const handleJoin = async (id) => {
    try {
      await axios.post("/api/community/" + id, { id: user._id });
      navigate("/community/" + id)
    } catch (err) {
      alert("Ya formas parte de esta comunidad")
    }
    
  }

  const fetchCommunity = async () =>{
    let res = await axios.get("/api/community/" + params.id);
    const today = new Date();
    const formattedDate = today.toISOString();
    const res_user = await axios.put("/auth/user/" + user._id, {last_time_in_community: formattedDate});
    dispatch({ type: "LOGIN_SUCCESS", payload: res_user.data.details });


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

      const resComm = await axios.get("/api/community");

      const filteredCommunities = resComm.data.filter((searchedCommunity) => {
        if (searchedCommunity.users.includes(user._id)) {
          return false;
        }
        if (searchedCommunity.name === res.data?.name) {
          return false;
        }
        return searchedCommunity.bookName === res.data?.bookName;
      });

      setCommunities(filteredCommunities);

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
          <h1 className="text-primary"> {community.name} </h1>
          <div className="card">
            <div className="card-header bg-secondary text-white">
            Comunidad sobre {community.bookName}. Creada el: <Moment date={moment(community.createdAt)} format="DD/MM/YYYY" />
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
              {messages?.map((message, index) => {
                const messageDate = new Date(message.createdAt); // Convierte el string en un objeto Date
                const lastLoginDate = new Date(user.updatedAt); // Convierte la fecha de inicio de sesión
                
                // Sumar 5 minutos (300,000 ms) a la fecha de creación del mensaje
                const messageDatePlus5Min = new Date(messageDate.getTime() + 5 * 60 * 1000);
                console.log("MENSAJE" + messageDate)
                console.log("LAST LOGIN" + lastLoginDate)
                console.log("CON 5 MINS EXTRA"  + messageDatePlus5Min)
                
                // Determina el color según la comparación
                const textColor = messageDatePlus5Min > lastLoginDate ? 'red' : 'black';
                return (

                  <>
                <li onClick={() => handleReplyMessage(message._id)}  style={{
            backgroundColor: replyingTo === message._id ? "#c3c3c3" : "white", // Cambia el color según el estado
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
            color: textColor
          }}  key={index} className="list-group-item">
                  {message.username}: <span >{message.message}</span> - <Moment style={{color:"gray"}}  date={moment(message.createdAt)} format="DD/MM/YYYY" />
                </li>
                {responseMessages.filter((response) => response.father_id === message._id).map((response) => (
                  <li key={index} className="list-group-item" style={{ marginLeft: "25px" }}>
                  {response.username}: <span>{response.message}</span> - <Moment style={{color:"gray"}}  date={moment(response.createdAt)} format="DD/MM/YYYY" />
                </li>
                ))}
                </>


                )


              }
                

              )}
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
              {communities?.map((community) => (
                  <div className="medicine-sub-container-div" key={community._id}>
                    <li className="medicine-name-container">
                    <Link className="btn btn-secondary button-medicine-update" to={"/community/" + community._id}>
                      <span className="medicine-name"> {community.name}</span>
                    </Link>
                      <div className="medicine-button-div">
                        <button className="btn btn-danger " onClick={() => handleJoin(community._id)}>
                          Unirse
                        </button>
                      </div>
                    </li>
                  </div>
                ))}

          </div>
          <div className="card-footer">
            {isMember && (
              <button className="btn btn-danger me-2" onClick={() => handleExit(community._id)}>
                Salir de comunidad
              </button>
            )}
            {isAdmin && (
              <button className="btn btn-danger me-2" onClick={() => deleteCommunity(community._id)}>
                Eliminar Comunidad
              </button>
            )}
            {isAdmin && (
        <>
          {!showInput ? (
            <button
              className="btn btn-warning me-2"
              onClick={() => setShowInput(true)}
            >
              Cambiar nombre
            </button>
          ) : (
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Nuevo nombre"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button className="btn btn-success me-2" onClick={() => {
                modifyCommunityName(community._id);
                setShowInput(false);
                navigate(0)
              }}>
                Guardar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowInput(false)}
              >
                Cancelar
              </button>
            </div>
          )}
        </>
      )}
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}
