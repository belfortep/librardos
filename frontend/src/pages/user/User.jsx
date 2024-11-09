import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './user.css';
// import { stat } from 'fs';

export const User = () => {
  const {user} = useContext(AuthContext);
  const params = useParams()
  const [userClicked, setUserClicked] = useState({});


  const fetchUser = async () =>{
    let res = await axios.get("/auth/" + params.id);
    if (res.data !== null) {
      setUserClicked(res.data);
    } else {

    }
  }



  useEffect(()=>{
    if(user){
      fetchUser();
    }
  }, []);
  

  return (
    <>
      <h1>Usuario</h1>
      <div className="card medicine-wrapper">
        <div className="card-header">
          {userClicked.username}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Email: {userClicked.email}</li>
        </ul>
      </div>
    </>
  )
}
