import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./favourites.css";

export const Favourites = () => {
  const [books, setBooks] = useState([]);
  const [read, setRead] = useState([]);
  const [reading, setReading] = useState([]);
  const [toRead, setToRead] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchAllBooks = async () => {
    const favorites_list = await axios.get('/auth/fav/' + user._id);
    const res = [];
    for (const book of favorites_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res.push(response.data);
    }
    setBooks(res);

    const read_list = await axios.get('/auth/read/' + user._id);
    const res_read = [];
    for (const book of read_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res_read.push(response.data);
    }
    setRead(res_read);

    const reading_list = await axios.get('/auth/reading/' + user._id);
    const res_reading = [];
    for (const book of reading_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res_reading.push(response.data);
    }
    setReading(res_reading);

    const toRead_list = await axios.get('/auth/toRead/' + user._id);
    const res_toRead = [];
    for (const book of toRead_list.data) {
      const response = await axios.get(`/api/book/${book}`);
      res_toRead.push(response.data);
    }
    setToRead(res_toRead);
  };

  useEffect(() => {
    if (user) {
      fetchAllBooks();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-primary">Mis Libros</h1>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                Libros Favoritos
              </div>
              <ul className="list-group list-group-flush">
                {books.map((book, index) => (
                  <li key={index} className="list-group-item">
                    <Link to={`/${book._id}`} className="text-decoration-none text-dark">
                      {book.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                Libros Leídos
              </div>
              <ul className="list-group list-group-flush">
                {read.map((book, index) => (
                  <li key={index} className="list-group-item">
                    <Link to={`/${book._id}`} className="text-decoration-none text-dark">
                      {book.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                Libros Siendo Leídos
              </div>
              <ul className="list-group list-group-flush">
                {reading.map((book, index) => (
                  <li key={index} className="list-group-item">
                    <Link to={`/${book._id}`} className="text-decoration-none text-dark">
                      {book.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header bg-secondary text-white">
                Libros por Leer
              </div>
              <ul className="list-group list-group-flush">
                {toRead.map((book, index) => (
                  <li key={index} className="list-group-item">
                    <Link to={`/${book._id}`} className="text-decoration-none text-dark">
                      {book.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favourites;