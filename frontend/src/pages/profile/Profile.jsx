import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './profile.css';

export const Profile = () => {
  const {user} = useContext(AuthContext);

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
            <li className="list-group-item">{genre}</li>
          ))}
          <div>
            Escritores favoritos
          </div>
          {user?.writers?.map((writer) => (
            <li className="list-group-item">{writer}</li>
          ))}
          <li className="list-group-item">Email: {user.email}</li>
          <li className="list-group-item">Direccion: {user.address}</li>
          <li className="list-group-item">Fecha de nacimiento: {user.birth_date}</li>
        </ul>
      </div>
    </>
  )
}
