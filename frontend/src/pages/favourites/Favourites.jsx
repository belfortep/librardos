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
  const [read, setRead] = useState([]);
  const [reading, setReading] = useState([]);
  const [toRead, setToRead] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchAllBooks = async () => {
    const favorites_list = await axios.get('/auth/fav/' + user._id)
    console.log(favorites_list)
    const res = [];
    for (const book of favorites_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res.push(response.data);
    }
    
    const read_list = await axios.get('/auth/read/' + user._id)
    console.log(read_list)
    const res_read = [];
    for (const book of read_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res_read.push(response.data);
    }

    const reading_list = await axios.get('/auth/reading/' + user._id)
    console.log(reading_list)
    const res_reading = [];
    for (const book of reading_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res_reading.push(response.data);
    }

    const toRead_list = await axios.get('/auth/toRead/' + user._id)
    console.log(toRead_list)
    const res_toRead = [];
    for (const book of toRead_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res_toRead.push(response.data);
    }

    setBooks(res);
    setRead(res_read);
    setToRead(res_toRead);
    setReading(res_reading);
  }

  const handleFavorite = async (id) => {
    // alert("Libro añadido a favoritos");
    // await axios.post(`/api/user/${user._id}/favorites`, { bookId: id });
  }

  useEffect(() => {
    if (user) {
      fetchAllBooks();
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="favourite-main-div">
            <h1 className="favourite-title">Librardos</h1>
            <h2 className="favourite-sub-title">Lista de libros favoritos</h2>
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
            <h2 className="favourite-sub-title">Lista de libros leidos</h2>
            <div className="favourite-container">
              <ul className="favourite-sub-container">
                {read.map((book) => (
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
            <h2 className="favourite-sub-title">Lista de libros siendo leidos</h2>
            <div className="favourite-container">
              <ul className="favourite-sub-container">
                {reading.map((book) => (
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
            <h2 className="favourite-sub-title">Lista de libros por leer</h2>
            <div className="favourite-container">
              <ul className="favourite-sub-container">
                {toRead.map((book) => (
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
