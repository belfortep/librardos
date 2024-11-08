import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import Moment from 'react-moment'
import { AuthContext } from '../../context/AuthContext';
import './book.css';
import BookRating from '../../components/Stars/Stars';
// import { stat } from 'fs';

export const Book = () => {
  const [book, setBook] = useState({});
  const [comment, setComment] = useState("");
  const {user} = useContext(AuthContext);
  const params = useParams()

  const handleFavorite = async (id) => {
    // alert("Libro añadido a favoritos");
    await axios.post(`/api/book/fav/${id}`, { user_id: user._id });
  }

  const handleStatusChange = async (id, status) => {
    if (status === "Leido") {
      // Logic for when the status is "Leido"
      await axios.post(`/api/book/readBooks/${id}`, { user_id: user._id});
      console.log("The book has been read.");
    } else if (status === "Leyendo") {
      await axios.post(`/api/book/readingBooks/${id}`, { user_id: user._id});
      // Logic for when the status is "Leyendo"
      console.log("The book is being read.");
    } else if (status === "Por Leer") {
      await axios.post(`/api/book/toReadBooks/${id}`, { user_id: user._id});
      // Logic for when the status is "Por Leer"
      console.log("The book will be read.");
    }
    // You can add your logic to handle the status change here
  };


  const handleChange = (e) => {
    if (e.target.id === "comment") {
      setComment(e.target.value)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/book/message/" + params.id, {comment: comment});
    setComment("")
    await fetchBook()
  };
  const fetchBook = async () =>{
    let res = await axios.get("/api/book/" + params.id);
    if (res.data !== null) {
      setBook(res.data);
    } else {

    }

  };

  useEffect(()=>{
    
    
    if(user){
      fetchBook();
    }
  }, []);
  

  return (
    <>
      <Navbar/>
      <h1>Libro</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card medicine-wrapper">
              <div className="card-header">
                {book.title}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Descripcion: {book.description}</li>
                <li className="list-group-item">Editorial: {book.editorial}</li>
                <li className="list-group-item">Genero: {book.gender}</li>
                <li className="list-group-item">Escritor: {book.writer}</li>
                <li className="list-group-item">Paginas: {book.num_pages}</li>
                <li className="list-group-item">Fecha edicion: <Moment format='MM/YYYY'>{book.date_edition}</Moment></li>
                <li className="list-group-item"><img src={book.image} alt="Book cover" /></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="loginBox">
              <input id="comment" value={comment} placeholder="message" type="text" onChange={handleChange} required className="loginInput" />
              <button className="loginButton" type='submit'>Enviar</button>
            </form>
            <ul className="list-group list-group-flush">
              <span>Comentarios:</span>
              {book?.comments?.map((comment) => (
                <div key={comment}>
                  <li className="medicine-name-container">
                    {comment}
                  </li>
                </div>
              ))}
            </ul>
            <div className="d-flex flex-column align-items-start">
              <button className='btn btn-danger mb-2' onClick={()=>handleFavorite(book._id)}>❤️</button>
              <select
                className="btn btn-secondary mb-2"
                onChange={(e) => handleStatusChange(book._id, e.target.value)}
              >
                <option value="Nada">Status</option>
                <option value="Leido">Leido</option>
                <option value="Leyendo">Leyendo</option>
                <option value="Por Leer">Por Leer</option>
              </select>
              <BookRating bookId={book._id}/>
              <a className='nav-link' href={"https://www.amazon.com/s?k=" + book.title} target="_blank">Encuentra este libro en Amazon!</a>
              <Link className="nav-link" to={'/create/' + book._id}>Crear comunidad</Link>
              <button
                className="btn btn-primary"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                Copiar enlace del libro
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
