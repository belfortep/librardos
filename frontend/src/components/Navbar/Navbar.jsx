import { Book, Users, LogOut, ChevronDown, BookOpen, Users2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./navbar.css"

// Book categories for the dropdown
const bookCategories = [
  { name: 'Ficción', href: '/catalogo/ficcion' },
  { name: 'No Ficción', href: '/catalogo/no-ficcion' },
  { name: 'Fantasía', href: '/catalogo/fantasia' },
  { name: 'Ciencia Ficción', href: '/catalogo/ciencia-ficcion' },
  { name: 'Romance', href: '/catalogo/romance' },
];

const communityCategories = [
  { name: 'Clubes de Lectura', href: '/comunidades/clubes' },
  { name: 'Grupos por Género', href: '/comunidades/generos' },
  { name: 'Reseñas', href: '/comunidades/resenas' },
  { name: 'Discusiones', href: '/comunidades/discusiones' },
];

export const Navbar = () => {

  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) =>{
    e.preventDefault();
    dispatch({type: 'LOGOUT'});
    navigate('/login');
  }

  const handleMouseEnter = (dropdown) => {
    setHoveredDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setHoveredDropdown(null);
  };

  return (
    <>
    {user ? <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Librardos
        </a>

        <div className="navbar-links">
          <div 
            className="dropdown"
            onMouseEnter={() => handleMouseEnter('catalog')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/catalog" className="navbar-button">
              <Book className="icon" />
              Catálogo
              <ChevronDown className="icon" />
            </a>
            {hoveredDropdown === 'catalog' && (
              <div className="dropdown-content">
                {bookCategories.map((category) => (
                  <a key={category.href} href={category.href}>{category.name}</a>
                ))}
              </div>
            )}
          </div>

          <a href="/myBooks" className="navbar-button">
            <BookOpen className="icon" />
            Mis Libros
          </a>

          <div 
            className="dropdown"
            onMouseEnter={() => handleMouseEnter('communities')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/communities" className="navbar-button">
              <Users className="icon" />
              Comunidades
              <ChevronDown className="icon" />
            </a>
            {hoveredDropdown === 'communities' && (
              <div className="dropdown-content">
                {communityCategories.map((category) => (
                  <a key={category.href} href={category.href}>{category.name}</a>
                ))}
              </div>
            )}
          </div>

          <a href="/users" className="navbar-button">
            <Users2 className="icon" />
            Usuarios
          </a>
        </div>

        <div className="navbar-user">
          <Link className="navbar-button logout-button" onClick={handleClick} to={'/login'}>
            <LogOut className="icon" />
            <span className="sr-only">Cerrar sesión</span>
          </Link>

          <div className="user-profile">
            <span className="username">
              <Link to={'/profile'}>{user.username} </Link>
            </span>
            <div className="avatar">
              <img src={user.photo_url ? user.photo_url : "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"} alt="Profile picture"/>
            </div>
          </div>
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
  );
}
