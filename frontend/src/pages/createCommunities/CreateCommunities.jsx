import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "./createCommunities.css";


export const CreateCommunities = () => {
  const [community, setCommunity] = useState([]);
  const [book, setBook] = useState({});
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
    try {
      const result = await axios.post("/api/community", {name: community.name, bookId: params.id, user_id: user._id});
      await axios.post("/api/community/" + result.data, {id: user._id})
      await axios.post("/api/community/mod/" + result.data, {id: user._id})
      navigate("/");
    } catch (err) {
      alert(err.response.data.message)
    }
    
  };

  const fetchBook = async () =>{
    let res = await axios.get("/api/book/" + params.id);
    if (res.data !== null) {
      setBook(res.data);
    } else {

    }

  };

  useEffect(() => {
    if (user) {
      fetchBook();
    }
  }, []);

  return (
    <>
      <h1 style={{marginTop:"20px"}}>Crear Comunidad</h1>
      <form onSubmit={handleCreate} className="loginBoxSmall">
              <input id="name" placeholder="Nombre" type="text" onChange={handleChange} required className="loginInput" />
              <button className="loginButton" type='submit'>Crear</button>
        </form>
    
    </>
  );
};
