import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './profile.css';
import moment from 'moment';

export const Profile = () => {
  const {user} = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  const [friendCommunity, setFriendCommunity] = useState([])
  const acceptFriend = async (friend_name) => {
    const res = await axios.put("/auth/acceptFriend/" + user._id, {friend_name:friend_name})
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
  }

  const handleListOfCommunities = async (friend_name) => {
    const communities = await axios.get("/api/community");  // todas las communities
    const friend = await axios.post("/auth/name", {username: friend_name});
    const communities_of_my_friend = []
    for (const community of communities.data) {
      for (const user of community.users) {
        console.log(user)
        if (friend.data[0]._id === user) {
          communities_of_my_friend.push(community)
        }
      }
    }
    console.log(communities_of_my_friend)
    setFriendCommunity(communities_of_my_friend)    
  }

  return (
    <>
      <Navbar/>
      <h1>Usuario</h1>
      <div className="card medicine-wrapper">
        <div className="card-header">
          {user.username}
        </div>
        <ul className="list-group list-group-flush">
          <div>
            Generos favoritos
          </div>
          {user?.genres?.map((genre) => (
            <li className="">{genre}</li>
          ))}
          <div>
            Escritores favoritos
          </div>
          {user?.writers?.map((writer) => (
            <li className="">{writer}</li>
          ))}
          <div>
            Amigos
          </div>
          {user?.friends?.map((friend) => (
            <li className="" onClick={() => handleListOfCommunities(friend)}>{friend}</li>
          ))}
          <div>
            {friendCommunity.length == 0 ? "" : "Comunidades de mi amigo"}
          </div>
          {friendCommunity?.map((community) => (
            <li className=""><Link
            className=""
            to={"/community/" + community._id}
          >
            <span className="medicine-name">
          {community.name}
        </span>
          </Link></li>
          ))}
          <div>
            Solicitudes
          </div>
          {user?.pending_friend_request?.map((friend_request) => (
            <button className="" onClick={() => acceptFriend(friend_request)}>{friend_request}</button>
          ))}
          <li className="list-group-item">Email: {user.email}</li>
          <li className="list-group-item">Direccion: {user.address}</li>
          <li className="list-group-item">Fecha de nacimiento:<Moment
                          className="medicine-date"
                          date={moment(user.birth_date)}
                          format="DD/MM/YYYY"
                        /></li>
        </ul>
        <Link className="nav-link" to={'/edit'}>Editar perfil</Link>
      </div>
    </>
  )
}
