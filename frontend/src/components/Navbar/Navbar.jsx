import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./navbar.css"

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
            <Link className="nav-link" to={'/catalog'}>Catalogo</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/myBooks'}>Mis Libros</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/communities'}>Comunidades</Link>
            </li>
            {/* <li className="nav-item">
            <Link className="nav-link" to={'/agregar'}>Agregar</Link>
            </li> */}
            <li className="nav-item">
            <Link className="nav-link" to={'/users'}>Usuarios</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link"  onClick={handleClick} to={'/login'}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex">
        <span className="navbar-text">
        <Link style={{marginRight: 10}} className="nav-link" to={'/profile'}>{user.username} </Link>
        </span>
        <span className="navbar-text">
        <img style={{ marginRight: 10, float: "right", width: 24, height:24}} src={user.photo_url ? user.photo_url : "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"} alt="Profile picture"/>
        </span>
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
