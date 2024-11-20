import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './user.css';
import moment from 'moment';

export const User = () => {
  const {user} = useContext(AuthContext);
  const params = useParams()
  const { loading, error, dispatch } = useContext(AuthContext);
  const [userClicked, setUserClicked] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate()

  const fetchUser = async () =>{
    let res = await axios.get("/auth/" + params.id);
    console.log(res.data.username)
    console.log(user.username)
    if (res.data !== null) {
      if (res.data.username === user.username) {
        navigate("/profile")
      }
      setUserClicked(res.data);
      if (res.data?.blocked_users?.includes(user._id) || user?.blocked_users?.includes(res.data._id)) {
        navigate("/")
      } 
      
      setIsFriend(res.data?.friends.includes(user.username))
    } else {

    }
  }

  const eliminateFriend = async (user_name) => {
    console.log(user_name)
    const res = await axios.delete("/auth/deleteFriend/" + user._id, {data: {friend_name: user_name}})
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    setIsFriend(false);
    fetchUser();
  }

  useEffect(()=>{
    if(user){
      fetchUser();
    }
  }, []);
  

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-primary">Perfil de Usuario</h1>
        <div className="card">
          <div className="card-header bg-secondary text-white">
            {userClicked.username}
          </div>
          <div className="card-body">
            <h5 className="card-title">Datos del Usuario</h5>
            <div className="row mb-4">
  <div className="col-md-8">
    <ul className="list-group list-group-flush">
      {userClicked.privacy_level < 2 || isFriend ? <li className="list-group-item">Email: {userClicked.email}</li> : ""}
      {userClicked.privacy_level < 1 || isFriend ? <li className="list-group-item">Dirección: {userClicked.address}</li> : ""}
      {userClicked.privacy_level < 1 || isFriend ? <li className="list-group-item">
        Fecha de nacimiento: <Moment date={moment(userClicked.birth_date)} format="DD/MM/YYYY" />
      </li> : ""}
    </ul>
  </div>
  <div className="col-md-4">
    <li className="list-group-item"><img src={userClicked.photo_url ? userClicked.photo_url : "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"} alt="Profile picture" style={{ width: "30%" }} /></li>
  </div>
</div>
            <h5 className="card-title">Información Adicional</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Géneros favoritos:</strong>
                <ul>
                  {userClicked?.genres?.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
              </li>
              <li className="list-group-item">
                <strong>Escritores favoritos:</strong>
                <ul>
                  {userClicked?.writers?.map((writer, index) => (
                    <li key={index}>{writer}</li>
                  ))}
                </ul>
              </li>
              {userClicked.privacy_level < 2 || isFriend ? <li className="list-group-item">
                <strong>Amigos:</strong>
                <ul>
                  {userClicked?.friends?.map((friend, index) => (
                    <li key={index}>{friend}</li>
                  ))}
                </ul>
              </li> : ""}
              
            </ul>
            <button
                className="btn btn-primary me-2"
                onClick={() => navigator.clipboard.writeText("http://localhost:3000/register")}
              >
                Invita a tus amigos
            </button>   
            {isFriend && (
            <button
                className="btn btn-danger me-2"
                onClick={() => eliminateFriend(userClicked.username)}
              >
                Eliminar amigo
            </button>  
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
