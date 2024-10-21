import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Medicine } from './pages/medicine/Medicine';
import { Medicines } from './pages/medicines/Medicines';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { CreateMedicine } from './pages/createMedicine/CreateMedicine';
import { MedicineByDate } from './pages/medicineByDate/MedicineByDate';
import './app.css'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Medicines />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<Medicine />} />
          <Route path='/agregar' element={<CreateMedicine />} />
          <Route path='/agregar/:id' element={<CreateMedicine />} />
          <Route path='/por_fecha' element={<MedicineByDate/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
