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
  const [book, setBook] = useState({});
  const {user} = useContext(AuthContext);
  const params = useParams()
  const handleFavorite = async (id) => {

  }
  useEffect(()=>{
    
    const fetchBook = async () =>{
      let res = await axios.get("/api/book/" + params.id);
      if (res.data !== null) {
        setBook(res.data);
      } else {

      }

    };
    if(user){
      fetchBook();
    }
  }, []);
  

  return (
    <>
    <Navbar/>
      <h1>Libro</h1>
      <div className="card medicine-wrapper ">
      <div className="card-header ">
        {book.title}
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Descripcion: {book.description}</li>
        <li className="list-group-item">Editorial: {book.editorial}</li>
        <li className="list-group-item">Genero: {book.gender}</li>
        <li className="list-group-item">Escritor:  {book.writer}</li>
        <li className="list-group-item">Paginas: {book.num_pages}</li>
        <li className="list-group-item">Fecha edicion: <Moment format='MM/YYYY'>{book.date_edition}</Moment></li>
        <li className="list-group-item"><img src={book.image} /></li>
        
      </ul>
      <button className='btn btn-danger' onClick={()=>handleFavorite(book._id)}>❤️</button>
    </div>
    </>
  )
}
