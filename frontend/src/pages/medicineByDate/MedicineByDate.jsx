import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import Moment from "react-moment";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import "./medicineByDate.css";

export const MedicineByDate = () => {
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [solids, setSolids] = useState([]);
  const [liquids, setLiquids] = useState([]);
  const [psychos, setPsychos] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchBetweenDates = async (startDate, endDate) => {
    const solidRes = await axios.get(
      "/api/solid?startDate=" + startDate + "&endDate=" + endDate
    );

    const liquidRes = await axios.get(
      "/api/liquid?startDate=" + startDate + "&endDate=" + endDate
    );

    const psychoRes = await axios.get(
      "/api/psycho?startDate=" + startDate + "&endDate=" + endDate
    );

    setSolids(solidRes.data);
    setLiquids(liquidRes.data);
    setPsychos(psychoRes.data);
  };

  const fetchMedicines = async () => {
    await fetchBetweenDates(dates.startDate, dates.endDate);
  };

  const handleDelete = async (id, type) => {
    if (type === "S") {
      await axios.delete("/api/solid/" + id);
    } else if (type === "L") {
      await axios.delete("/api/liquid/" + id);
    } else if (type === "P") {
      await axios.delete("/api/psycho/" + id);
    }

    fetchMedicines();
  };
  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="medicine-main-div">
            <h1 className="medicine-title">Medicamentos</h1>
            <input
            placeholder="Inicio"
            id="startDate"
            type="month"
            onChange={(e) =>
              setDates((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
          <br />
          <input
            placeholder="Fin"
            id="endDate"
            type="month"
            onChange={(e) =>
              setDates((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
          <br />
          <button onClick={() => fetchMedicines()}>Buscar</button>
            <h2 className="medicine-sub-title">Solidos</h2>
            <div className="medicine-container">
              <ul className="medicine-sub-container">
                {solids.map((solid) => (
                  <div className="medicine-sub-container-div" key={solid._id}>
                    <li className="medicine-name-container">
                      <span className="medicine-name">
                        {solid.name}
                      </span>
                      <div className="medicine-button-div">
                        <button
                          className="btn btn-danger button-medicine-delete"
                          onClick={() => handleDelete(solid._id, "S")}
                        >
                          🗑️
                        </button>
                        <Link
                          className="btn btn-secondary button-medicine-update"
                          to={"/agregar/S," + solid._id}
                        >
                          🔄
                        </Link>
                      </div>
                    </li>
                    <li>
                      <span>
                        Cantidad: {solid.quantity}
                      </span>
                    </li>
                    <li className="medicine-date-container">
                      <span className="medicine-date-text">
                        Fecha de vencimiento:
                      </span>
                      <Moment
                        className="medicine-date"
                        date={moment(solid.expiredDate).add(1, "d")}
                        format="MM/YYYY"
                      />
                    </li>

                    {new Date(solid.expiredDate) <= new Date().getTime() ? (
                      <div className="medicine-expired-text">VENCIDO</div>
                    ) : null}
                  </div>
                ))}
              </ul>
              <h2 className="medicine-sub-title">Liquidos</h2>
              <ul className="medicine-sub-container">
                {liquids.map((liquid) => (
                  <div className="medicine-sub-container-div" key={liquid._id}>
                    <li className="medicine-name-container">
                      <span className="medicine-name" >
                        {liquid.name}
                      </span>
                      <div className="medicine-button-div">
                        <button
                          className="btn btn-danger button-medicine-delete"
                          onClick={() => handleDelete(liquid._id, "L")}
                        >
                          🗑️
                        </button>
                        <Link
                          className="btn btn-secondary button-medicine-update"
                          to={"/agregar/L," + liquid._id}
                        >
                          🔄
                        </Link>
                      </div>
                    </li>
                    <li>
                      <span>
                        Cantidad: {liquid.quantity}
                      </span>
                    </li>
                    <li className="medicine-date-container">
                      <span className="medicine-date-text">
                        Fecha de vencimiento:
                      </span>
                      <Moment
                        className="medicine-date"
                        date={moment(liquid.expiredDate).add(1, "d")}
                        format="MM/YYYY"
                      />
                    </li>

                    {new Date(liquid.expiredDate).getTime() <=
                    new Date().getTime() ? (
                      <div className="medicine-expired-text">VENCIDO</div>
                    ) : null}
                  </div>
                ))}
              </ul>
              <h2 className="medicine-sub-title">Psicofarmacos</h2>
              <ul className="medicine-sub-container">
                {psychos.map((psycho) => (
                  <div className="medicine-sub-container-div" key={psycho._id}>
                    <li className="medicine-name-container">
                      <span className="medicine-name">
                        {psycho.name}
                      </span>
                      <div className="medicine-button-div">
                        <button
                          className="btn btn-danger button-medicine-delete"
                          onClick={() => handleDelete(psycho._id, "P")}
                        >
                          🗑️
                        </button>
                        <Link
                          className="btn btn-secondary button-medicine-update"
                          to={"/agregar/P," + psycho._id}
                        >
                          🔄
                        </Link>
                      </div>
                    </li>
                    <li>
                      <span>
                        Cantidad: {psycho.quantity}
                      </span>
                    </li>
                    <li className="medicine-date-container">
                      <span className="medicine-date-text">
                        Fecha de vencimiento:
                      </span>
                      <Moment
                        className="medicine-date"
                        date={moment(psycho.expiredDate).add(1, "d")}
                        format="MM/YYYY"
                      ></Moment>
                    </li>

                    {new Date(psycho.expiredDate).getTime() <=
                    new Date().getTime() ? (
                      <div className="medicine-expired-text">VENCIDO</div>
                    ) : null}
                  </div>
                ))}
              </ul>
            </div>
            
          </div>
        </>
      ) : (
        <div>
          <Navbar />
          Login first
        </div>
      )}
    </>
  );
};
