import { Link } from 'react-router-dom';
import './register.css'
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
  });
  
  const handleChange = (e) => {
    if (e.target.id === "username") {
      setUser((prev) => ({ ...prev, username: e.target.value }));
    }
    if (e.target.id === "email") {
      setUser((prev) => ({ ...prev, email: e.target.value }));
    }
    if (e.target.id === "password") {
      setUser((prev) => ({ ...prev, password: e.target.value }));
    }
    if (e.target.id === "passwordAgain") {
      setUser((prev) => ({ ...prev, passwordAgain: e.target.value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.username === undefined || user.username.length < 3 || user.username.length > 25) {
      return alert("El nombre debe tener entre 3 y 25 letras");
    }
    if (user.password === undefined || user.username.length < 6 ) {
      return alert("Contraseña demasiado corta");
    }

    if (user.password != user.passwordAgain) {
      return alert("Las contraseñas no coinciden");
    }
    const {passwordAgain, ...userData} = user;
    await axios.post("/auth/register", userData);
    navigate("/login");
  };

  const register = async (details) => {
    setUser((prev) => ({username: details.name, email: details.emai, password: details.email, passwordAgain: details.email }));
    // const userData = { username: details.name, email: details.email, password: details.email};
    const {passwordAgain, ...userData} = user;
    console.log(userData)
    await axios.post("/auth/register", userData);
    navigate("/login");
  }

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Librardos</h3>
            <span className="loginDesc">
              Interactua con lectores y busca tu siguiente libro para leer!
            </span>
          </div>
          <div className="loginRight">
            <form onSubmit={handleSubmit} className="loginBox">
              <input id="email" placeholder="Email" type="email" onChange={handleChange} required className="loginInput" />
              <input id="username" placeholder="Username" type="text" onChange={handleChange} required className="loginInput" />
              <input id="password" placeholder="Password" type="password" onChange={handleChange} minLength="6" required className="loginInput" />
              <input id="passwordAgain" placeholder="Confirm password" onChange={handleChange} type="password" minLength="6" required className="loginInput" />
              <button className="loginButton" type='submit'>Registrar</button>
              <span className="loginForgot"></span>
              <Link to={'/login/'} className="loginRegisterButton">Tienes una cuenta?</Link>
              <div className='Login' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '12px' }}>
              <GoogleLogin
                className="sign"
                onSuccess={credentialResponse => {
                    const details= jwtDecode(credentialResponse.credential);
                    console.log(credentialResponse);
                    register(details)
                  }}
                onError={() => {
                    console.log('Login Failed');
                }}
               />
               </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
