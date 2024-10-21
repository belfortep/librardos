import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) =>{
    e.preventDefault();
    dispatch({type: 'LOGOUT'});
    navigate('/login');
  }

  return (
    <>
    {user ? <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <div className="container-fluid">
        
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to={'/'}>Lista</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/agregar'}>Agregar</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/por_fecha'}>Por Fecha</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link"  onClick={handleClick} to={'/login'}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> : <><nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <div className="container-fluid">
        
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/register'}>Registrarse</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/login'}>Login</Link>
            </li>
            <li className="nav-item">
            </li>
          </ul>
        </div>
      </div>
    </nav></>}
    
    </>
  )
}
