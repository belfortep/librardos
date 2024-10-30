import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import Moment from "react-moment";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "./books.css";
import BookRatingDisplay from "../../components/DisplayBookRating/DisplayBookRating";


export const Books = () => {
  const [bookToSearch, setBookToSearch] = useState(""); // Estado para el término de búsqueda
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  const calculateAverageScore = (book) => {
    const scores = book.scores;
    if (scores.length === 0) return 0; // Maneja el caso donde no haya scores
    
    const totalScore = scores.reduce((sum, entry) => sum + entry.score, 0);
    const averageScore = totalScore / scores.length;
    console.log(averageScore)
  
    return averageScore;
  };

  const fetchBooks = async () => {
    const res = await axios.get("/api/book");
    setBooks(res.data)
  }

  const handleFavorite = async (id) => {
    // alert("Libro añadido a favoritos");
    await axios.post(`/api/book/fav/${id}`, { user_id: user._id });
  }

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, []);

   // Filtra los libros según el término de búsqueda
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(bookToSearch.toLowerCase())
  );


  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="medicine-main-div">
            <h1 className="medicine-title">Librardos</h1>
            <h2 className="medicine-sub-title">Lista de libros</h2>
            
            {/* Input de búsqueda */}
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={bookToSearch}
              onChange={(e) => setBookToSearch(e.target.value)}
              className="search-input"
            />
  
            <div className="medicine-container">
              <ul className="medicine-sub-container">
                {filteredBooks.map((book) => {
                  const averageRating = calculateAverageScore(book); 
                  return (
                    <div className="medicine-sub-container-div" key={book._id}>
                      <li className="medicine-name-container">
                        <Link
                          className="btn btn-secondary button-medicine-update"
                          to={"/" + book._id}
                        >
                          <span className="medicine-name">
                            {book.title}
                          </span>
                        </Link>
                        <div className="medicine-button-div">
                          <button
                            className="btn btn-danger button-medicine-delete"
                            onClick={() => handleFavorite(book._id)}
                          >
                            ❤️
                          </button>
                        </div>
                      </li>
                      <li>
                        <span>
                          Escritor: {book.writer}
                        </span>
                      </li>
                      <li>
                        <span>
                          Genero: {book.gender}
                        </span>
                      </li>
                      <li>
                        <span>
                          Calificacion: <BookRatingDisplay rating={averageRating}/>
                        </span>
                      </li>
                      <li className="medicine-date-container">
                        <span className="medicine-date-text">
                          Fecha de edicion:
                        </span>
                        <Moment
                          className="medicine-date"
                          date={moment(book.date_edition).add(1, "d")}
                          format="MM/YYYY"
                        />
                      </li>
                    </div>
                  )
                }
                )}
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
