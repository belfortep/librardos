import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import welcomeImage from '../../images/welcomeimage.jpeg';

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
      if (res.data.details.is_banned) {
        alert("Tu cuenta esta suspendida por tu mal comportamiento")
        dispatch({type:"LOGIN_FAILURE", payload: "mal comportamiento"})
        return
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <>
    <div className="center-screen container">
    <div className="row">
      <div className="col s5">
        <div className="card">
          <div className="card-content">
            <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Inicia sesion</h1>
            <img 
                      src={welcomeImage} 
                      alt="Welcome to Librardos" 
                      className="img-fluid rounded bg-light p-3" 
                    />
              <label htmlFor="inputEmail" className="sr-only">Nombre de usuario</label>
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="form-control"
              />
              <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="form-control"
              />
                <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button disabled={loading} className="btn btn-lg btn-primary btn-block"> Login </button>
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



{/* <div className="center-screen container">
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
        <button disabled={loading} className="btn btn-lg btn-primary btn-block">
          Login
        </button>
        {error && <span>{error.message}</span>}
        </form>
        </div>
        </div>
        </div>
        </div>
    </div> */}