import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Navbar} from '../../components/Navbar/Navbar';
import "./login.css";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <>
    <Navbar/>
    <div className="center-screen container">
     <div className="row">
      <div className="col s5">
        <div className="card">
          <div className="card-content">

        <form  className="form-control" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="form-control"
        />
        <button disabled={loading} className="btn btn-secondary">
          Login
        </button>
        {error && <span>{error.message}</span>}
        </form>
        </div>
        </div>
        </div>
        </div>
    </div>
    </>
  );
};