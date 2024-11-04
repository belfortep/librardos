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
  const acceptFriend = async (friend_name) => {
    const res = await axios.put("/auth/acceptFriend/" + user._id, {friend_name:friend_name})
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
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
            <li className="">{friend}</li>
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
