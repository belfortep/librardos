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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const res = await axios.get("/api/community");
    setCommunities(res.data)
  }

  const handleJoin = async (id) => {
    await axios.post("/api/community/" + id, { id: user._id });
    navigate("/community/" + id)
  }

  useEffect(() => {
    if (user) {
      fetchBooks();
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
