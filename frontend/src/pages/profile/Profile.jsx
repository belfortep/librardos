import React, { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import Moment from 'react-moment';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import './profile.css';

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const [friendCommunity, setFriendCommunity] = useState([]);

  const acceptFriend = async (friend_name) => {
    const res = await axios.put("/auth/acceptFriend/" + user._id, { friend_name: friend_name });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
  };

  const handleListOfCommunities = async (friend_name) => {
    const communities = await axios.get("/api/community");  // todas las communities
    const friend = await axios.post("/auth/name", { username: friend_name });
    const communities_of_my_friend = [];
    for (const community of communities.data) {
      for (const user of community.users) {
        if (friend.data[0]._id === user) {
          communities_of_my_friend.push(community);
        }
      }
    }
    setFriendCommunity(communities_of_my_friend);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-primary">Perfil de Usuario</h1>
        <div className="card">
          <div className="card-header bg-secondary text-white">
            {user.username}
          </div>
          <div className="card-body">
            <h5 className="card-title">Datos del Usuario</h5>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">Email: {user.email}</li>
              <li className="list-group-item">Dirección: {user.address}</li>
              <li className="list-group-item">
                Fecha de nacimiento: <Moment date={moment(user.birth_date)} format="DD/MM/YYYY" />
              </li>
            </ul>
            <h5 className="card-title">Información Adicional</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Géneros favoritos:</strong>
                <ul>
                  {user?.genres?.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
              </li>
              <li className="list-group-item">
                <strong>Escritores favoritos:</strong>
                <ul>
                  {user?.writers?.map((writer, index) => (
                    <li key={index}>{writer}</li>
                  ))}
                </ul>
              </li>
              <li className="list-group-item">
                <strong>Amigos:</strong>
                <ul>
                  {user?.friends?.map((friend, index) => (
                    <li key={index} onClick={() => handleListOfCommunities(friend)}>{friend}</li>
                  ))}
                </ul>
              </li>
              {friendCommunity.length > 0 && (
                <li className="list-group-item">
                  <strong>Comunidades de mi amigo:</strong>
                  <ul>
                    {friendCommunity.map((community, index) => (
                      <li key={index}>
                        <Link to={"/community/" + community._id}>
                          {community.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              <li className="list-group-item">
                <strong>Solicitudes:</strong>
                <ul>
                  {user?.pending_friend_request?.map((friend_request, index) => (
                    <li key={index}>
                      <button className="btn btn-primary" onClick={() => acceptFriend(friend_request)}>
                        {friend_request}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <Link className="btn btn-secondary" to={'/edit'}>Editar perfil</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;