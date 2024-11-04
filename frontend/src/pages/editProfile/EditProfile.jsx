import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './editProfile.css';

export const EditProfile = () => {
  const {user} = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: user.email,
    user_password: "",
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/auth/auth/" + user._id, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <>
      <Navbar/>
      <h1>Usuario</h1>
      <div className="card medicine-wrapper">
      <form  className="form-control" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="password"
          placeholder="password"
          id="user_password"
          value={credentials.user_password}
          onChange={handleChange}
          className="form-control"
        />
        <button className="btn btn-secondary">
          Login
        </button>
        </form>
      </div>
    </>
  )
}
