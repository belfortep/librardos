import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './medicine.css';

export const Medicine = () => {

  const [medicine, setMedicine] = useState({});
  const [found, setFound] = useState(false);
  const {user} = useContext(AuthContext);
  const params = useParams()
  const type = params.id.split(',');
  const navigate = useNavigate();

  const handleDelete = async (id, type) =>{
    if(type === 'S'){
      await axios.delete('/api/solid/' + id);
    }else if (type === 'L'){
      await axios.delete('/api/liquid/' + id);
    }else if (type === 'P'){
      await axios.delete('/api/psycho/' + id);
    }
    
    navigate('/');
  }
  useEffect(()=>{
    
    const fetchMedicine = async () =>{
      let res;
      try{
        if(type[0] === 'S'){
          res = await axios.get('/api/solid/' + type[1]);
        }else if(type[0] === 'L'){
          res = await axios.get('/api/liquid/' + type[1]);
        }else if(type[0] === 'P'){
          res = await axios.get('/api/psycho/' + type[1]);
        }
        if(res.data !== null){
          await setMedicine(res.data);
          setFound(true);
        }
        if(res.data === null){
          setFound(false);
        }
      }catch(err){
       
       console.log(err);
       setFound(false);
      }
    };
    if(user){
      fetchMedicine();
    }
    
    
  }, [found]);
  

  return (
    <>
    <Navbar/>
      <h1>Medicamento</h1>
      {found ? 
      <div className="card medicine-wrapper ">
      <div className="card-header ">
        {medicine.name}
      </div>
      <ul className="list-group list-group-flush">
        {medicine.freeSale ? <li className='list-group-item'>Es venta libre</li> : null}
        <li className="list-group-item">Cantidad: {medicine.quantity}</li>
        <li className="list-group-item">Fecha de vencimiento: <Moment format='MM/YYYY'>{medicine.expiredDate}</Moment>{new Date(medicine.expiredDate).getTime() <= new Date().getTime() ? <div>VENCIDO</div> : null}</li>
        
      </ul>
      <button className='btn btn-danger' onClick={()=>handleDelete(medicine._id, type[0])}>🗑️</button>
      <Link  className='btn btn-secondary' to={'/agregar/' + type[0] + ',' + medicine._id}>🔄</Link>
    </div>
      : <div>Not found</div>}
      
    </>
  )
}
