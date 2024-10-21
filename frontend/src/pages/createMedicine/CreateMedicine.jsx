import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./createMedicine.css";

export const CreateMedicine = () => {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let type = "";
  if (typeof params.id === "string") {
    type = params.id.split(",");
  }

  const [medicine, setMedicine] = useState({
    name: "",
    expiredDate: "",
    freeSale: false,
    quantity: null,
    type: "solid",
  });
  const fetchSolid = async (id) => {
    const res = await axios.get("/api/solid/" + id);
    const updatedDate = res.data.expiredDate.split("-");
    const newDate = updatedDate[0] + "-" + updatedDate[1];
    await setMedicine(res.data);

    await setMedicine((prev) => ({
      ...prev,
      type: "solid",
      expiredDate: newDate,
    }));
  };

  const fetchLiquid = async (id) => {
    const res = await axios.get("/api/liquid/" + id);
    const updatedDate = res.data.expiredDate.split("-");
    const newDate = updatedDate[0] + "-" + updatedDate[1];
    setMedicine(res.data);
    setMedicine((prev) => ({ ...prev, type: "liquid", expiredDate: newDate }));
  };

  const fetchPsycho = async (id) => {
    const res = await axios.get("/api/psycho/" + id);
    const updatedDate = res.data.expiredDate.split("-");
    const newDate = updatedDate[0] + "-" + updatedDate[1];
    setMedicine(res.data);
    setMedicine((prev) => ({ ...prev, type: "psycho", expiredDate: newDate }));
  };
  const handleChange = (e) => {
    if (e.target.id === "name") {
      setMedicine((prev) => ({ ...prev, name: e.target.value }));
    }
    if (e.target.id === "quantity") {
      setMedicine((prev) => ({ ...prev, quantity: e.target.value }));
    }
    if (e.target.id === "freeSale") {
      setMedicine((prev) => ({ ...prev, freeSale: !medicine.freeSale }));
    }
    if (e.target.id === "expiredDate") {
      setMedicine((prev) => ({ ...prev, expiredDate: e.target.value }));
    }
    if (e.target.id === "type") {
      setMedicine((prev) => ({ ...prev, type: e.target.value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (medicine.name === undefined || medicine.name === "") {
      return alert("El medicamento debe tener un nombre");
    }
    if (medicine.expiredDate === undefined || medicine.expiredDate === "") {
      return alert("Se debe establecer una fecha de vencimiento");
    }
    if (typeof params.id !== "string") {
      try {
        if (medicine.type === "solid") {
          const { type, ...otherData } = medicine;
          await axios.post("/api/solid", otherData);
        } else if (medicine.type === "liquid") {
          const { type, ...otherData } = medicine;
          await axios.post("/api/liquid", otherData);
        } else if (medicine.type === "psycho") {
          const { type, ...otherData } = medicine;
          await axios.post("/api/psycho", otherData);
        }

        setMedicine({
          name: "",
          quantity: 1,
          expiredDate: "",
          freeSale: false,
          type: "solid",
        });
      } catch (err) {
        console.log(err);
        alert("Ocurrio un error, intentalo mas tarde");
      }
    } else {
      try {
        if (type[0] === "S") {
          const { type, _id, ...otherData } = medicine;
          if (type === "liquid") {
            await axios.delete("/api/solid/" + _id);
            await axios.post("/api/liquid/", otherData);
          } else if (type === "psycho") {
            await axios.delete("/api/solid/" + _id);
            await axios.post("/api/psycho/", otherData);
          } else {
            await axios.put("/api/solid/" + _id, otherData);
          }
        } else if (type[0] === "L") {
          const { type, _id, ...otherData } = medicine;
          if (type === "solid") {
            await axios.delete("/api/liquid/" + _id);
            await axios.post("/api/solid/", otherData);
          } else if (type === "psycho") {
            await axios.delete("/api/liquid/" + _id);
            await axios.post("/api/psycho/", otherData);
          } else {
            await axios.put("/api/liquid/" + _id, otherData);
          }
        } else if (type[0] === "P") {
          const { type, _id, ...otherData } = medicine;
          if (type === "solid") {
            await axios.delete("/api/psycho/" + _id);
            await axios.post("/api/solid/", otherData);
          } else if (type === "liquid") {
            await axios.delete("/api/psycho/" + _id);
            await axios.post("/api/liquid/", otherData);
          } else {
            await axios.put("/api/psycho/" + _id, otherData);
          }
        }
        setMedicine({
          name: "",
          quantity: 1,
          expiredDate: "",
          freeSale: false,
          type: "solid",
        });
      } catch (err) {
        console.log(err);
        alert("Ocurrio un error, intentalo mas tarde");
      }
    }

    navigate("/");
  };
  useEffect(() => {
    if (params && user) {
      if (type[0] === "S") {
        fetchSolid(type[1]);
      } else if (type[0] === "L") {
        fetchLiquid(type[1]);
      } else if (type[0] === "P") {
        fetchPsycho(type[1]);
      }
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="create-main-div">
            <div className="create-box">
              <form className="create-form-name" onSubmit={handleSubmit}>
                <br />
                <input
                  value={medicine.name}
                  placeholder="Nombre"
                  id="name"
                  type="text"
                  className="create-input-name"
                  onChange={handleChange}
                />
                <br />
                <input
                  value={medicine.quantity}
                  placeholder="Cantidad"
                  id="quantity"
                  type="number"
                  className="create-input-quantity"
                  onChange={handleChange}
                />
                <br />
                <span className="create-free-sale-text">Venta libre? </span>
                <input
                  value={medicine.freeSale}
                  placeholder="Venta libre"
                  id="freeSale"
                  checked={medicine.freeSale}
                  type="checkbox"
                  className="create-input-free-sale"
                  onChange={handleChange}
                />
                <br />
                <input
                  value={medicine.expiredDate}
                  placeholder="Fecha Vencimiento"
                  id="expiredDate"
                  type="month"
                  className="create-input-date"
                  onChange={handleChange}
                />
                <br />
                <select
                  value={medicine.type}
                  id="type"
                  className="create-input-type"
                  onChange={handleChange}
                >
                  <option value="solid">Solido</option>
                  <option value="liquid">Liquido</option>
                  <option value="psycho">Psicofarmaco</option>
                </select>
                <button type="submit" className="create-button-send">
                  Enviar
                </button>
              </form>
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
