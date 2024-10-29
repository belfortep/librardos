import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import Moment from "react-moment";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "./createCommunities.css";


export const CreateCommunities = () => {
  const [community, setCommunity] = useState([]);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "name") {
      setCommunity((prev) => ({ ...prev, name: e.target.value }));
    }
    
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await axios.post("/api/community", {name: community.name, book: params.id});
    await axios.post("/api/community/" + result.data, {id: user._id})
    navigate("/");
  };

  return (
    <>
    <Navbar/>
      <h1>CREAR COMUNIDAD</h1>
      <form onSubmit={handleCreate} className="loginBox">
              <input id="name" placeholder="Name" type="text" onChange={handleChange} required className="loginInput" />
              <button className="loginButton" type='submit'>Crear</button>
        </form>
    
    </>
  );
};
