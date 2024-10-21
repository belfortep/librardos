import React from 'react'

import { Link } from 'react-router-dom';
import './register.css'
export const Register = () => {
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
            <form className="loginBox">
              <input placeholder="Email" type="email" required className="loginInput" />
              <input placeholder="Username" type="text" required className="loginInput" />
              <input placeholder="Password" type="password" minLength="6" required className="loginInput" />
              <input placeholder="Password again" type="password" minLength="6" required className="loginInput" />
              <button className="loginButton" type='submit'>Register</button>
              <span className="loginForgot"></span>
              <Link to={'/login/'} className="loginRegisterButton">Tienes una cuenta?</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
