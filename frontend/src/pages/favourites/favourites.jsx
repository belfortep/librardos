import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import Moment from "react-moment";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "./favourites.css";

export const Favourites = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchFavoriteBooks = async () => {
    const actual_user = await axios.get('/auth/fav/' + user._id)
    console.log(actual_user)
    const res = [];
    for (const book of actual_user.data) {
      const response = await axios.get(`/api/book/${book}`);
      res.push(response.data);
    }
    setBooks(res);
  }

  const handleFavorite = async (id) => {
    // alert("Libro añadido a favoritos");
    // await axios.post(`/api/user/${user._id}/favorites`, { bookId: id });
  }

  useEffect(() => {
    if (user) {
      fetchFavoriteBooks();
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="favourite-main-div">
            <h1 className="favourite-title">Librardos</h1>
            <h2 className="favourite-sub-title">Lista de libros</h2>
            <div className="favourite-container">
              <ul className="favourite-sub-container">
                {books.map((book) => (
                  <div className="favourite-sub-container-div" key={book._id}>
                    <li className="favourite-name-container">
                      <Link
                        className="btn btn-secondary button-favourite-update"
                        to={"/" + book._id}
                      >
                        <span className="favourite-name">{book.title}</span>
                      </Link>
                      <div className="favourite-button-div">
                        <button
                          className="btn btn-danger button-favourite-delete"
                          onClick={() => handleFavorite(book._id)}
                        >
                          ❤️
                        </button>
                      </div>
                    </li>
                    <li>
                      <span>Escritor: {book.writer}</span>
                    </li>
                    <li>
                      <span>Genero: {book.gender}</span>
                    </li>
                    <li className="favourite-date-container">
                      <span className="favourite-date-text">Fecha de edicion:</span>
                      <Moment
                        className="favourite-date"
                        date={moment(book.date_edition).add(1, "d")}
                        format="MM/YYYY"
                      />
                    </li>
                  </div>
                ))}
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
