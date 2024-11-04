import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import "./communities.css";


export const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [name, setName] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchCommunities = async () => {
    const res = await axios.get("/api/community");
    setCommunities(res.data)
  }

  const handleTitleChange = async (e) => {
    if (e.target.id === "name") {
      if (e.target.value.length > 3) {
        setName(e.target.value);
      } else {
        setName("")
      }
    }
    const res = await axios.post("/api/community/name", {name: name})
    setCommunities(res.data)
  };

  const handleBookChange = async (e) => {
    if (e.target.id === "name") {
      if (e.target.value.length > 3) {
        setName(e.target.value);
      } else {
        setName("")
      }
    }
    const res = await axios.post("/api/community/book", {bookName: e.target.value})
    setCommunities(res.data)
  };

  const handleJoin = async (id) => {
    try {
      await axios.post("/api/community/" + id, { id: user._id });
      navigate("/community/" + id)
    } catch (err) {
      alert("Ya formas parte de esta comunidad")
    }
    
  }

  useEffect(() => {
    if (user) {
      fetchCommunities();
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="medicine-main-div">
            <h1 className="medicine-title">Librardos</h1>
            <h2 className="medicine-sub-title">Lista de comunidades</h2>
            <input id="name" placeholder="name" type="text" onChange={handleTitleChange} required className="loginInput" />
            <input id="name" placeholder="book" type="text" onChange={handleBookChange} required className="loginInput" />
            <div className="medicine-container">
              <ul className="medicine-sub-container">
                {communities.map((community) => (
                  <div className="medicine-sub-container-div" key={community._id}>
                    <li className="medicine-name-container">
                    <Link
                          className="btn btn-secondary button-medicine-update"
                          to={"/community/" + community._id}
                        >
                          <span className="medicine-name">
                        {community.name}
                      </span>
                        </Link>
                      <div className="medicine-button-div">
                        <button
                          className="btn btn-danger "
                          onClick={() => handleJoin(community._id)}
                        >
                          Unirse
                        </button>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
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
