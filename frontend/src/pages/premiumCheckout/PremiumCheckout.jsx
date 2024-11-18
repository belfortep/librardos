import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import Moment from 'react-moment';
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// import './premiumCheckout.css';

export const PremiumCheckout = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const premiumCheckout = async (userId) => {
        const res = await axios.put(`/auth/premium/${user._id}`, { userId: user._id });
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
        navigate("/profile")
    };


    return (
        <>
            <div className="container mt-3">
                <h1 className="text-primary">Conviertete en Premium</h1>
                <div className="card">
                    <div className="card-header bg-secondary text-white">
                        Beneficios
                    </div>
                    <div className="card-body">
                        <div className="row mb-4">
                            <div className="col-md-8">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Comunidades ilimitadas</li>
                                    <li className="list-group-item">Contacto con autores</li>
                                    <li className="list-group-item">Sin anuncios</li>
                                    <li className="list-group-item">Apoya al futuro de Librardos</li>
                                    <li className="list-group-item">Mucho mas!</li>
                                </ul>
                            </div>
                        </div>
                        <h5 className="card-title">Información Adicional</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <strong>Planes:</strong>
                                <li className="list-group-item">Plan 1</li>
                                <li className="list-group-item">Plan 2</li>
                                <li className="list-group-item">Plan 3</li>
                            </li>
                        </ul>
                    </div>
                    <div className="card-footer">
                    <button className="btn btn-warning" onClick={() => premiumCheckout(user._id)}>
                        Conviertete en usuario Premium hoy!
                    </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PremiumCheckout;