import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import "./users.css";


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await axios.get("/api/user");
    setUsers(res.data)
  }

  const handleChange = async (e) => {
    if (e.target.id === "name") {
      if (e.target.value.length > 3) {
        setName(e.target.value);
      } else {
        setName("")
      }
    }
    const res = await axios.get("/api/user/name", {name: name})
    setUsers(res.data)
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="medicine-main-div">
            <h1 className="medicine-title">Librardos</h1>
            <h2 className="medicine-sub-title">Lista de usuarios</h2>
            <input id="name" placeholder="name" type="text" onChange={handleChange} required className="loginInput" />
            <div className="medicine-container">
              <ul className="medicine-sub-container">
                {users.map((user) => (
                  <div className="medicine-sub-container-div" key={user._id}>
                    <li className="medicine-name-container">
                    <Link
                          className="btn btn-secondary button-medicine-update"
                          to={"/user/" + user._id}
                        >
                          <span className="medicine-name">
                        {user.name}
                      </span>
                        </Link>
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
