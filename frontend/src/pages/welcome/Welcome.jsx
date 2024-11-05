import React, { useContext } from "react";
import './welcome.css' ;
import { Navbar } from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import welcomeImage from '../../images/welcomeimage.jpeg';


export const Welcome = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
          {user ? (
            <>
              <Navbar />
              <div className="favourite-main-div">
                
              </div>
            <div className="title-content">
                <h1 className="favourite-title">Bienvenido a Librardos</h1>
                <h2 className="favourite-sub-title">El lugar donde tus libros y tus amigos se unen!</h2>
            </div>
            <div className="image-container">
                  <img 
                    src={welcomeImage} 
                    alt="Welcome to Librardos" 
                    className="welcome-image" 
                  />
                </div>
            </>
          ) : (
            <div>
              <Navbar />
              Necesita estar conectado
            </div>
          )}
        </>
      );
};

export default Welcome;