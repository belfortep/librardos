import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Book } from './pages/book/Book';
import { Books } from './pages/books/Books';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { Favourites } from './pages/favourites/Favourites';
import './app.css'
import { CreateCommunities } from './pages/createCommunities/CreateCommunities';
import { Communities } from './pages/communities/Communities';
import { Community } from './pages/community/Community';
import { Users} from './pages/users/Users';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/communities' element={<Communities />} />
          <Route path='/community/:id' element={<Community />} />
          <Route path="/create/:id" element={<CreateCommunities/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<Book />} />
          <Route path='/favourites'element={<Favourites/>}/>
          <Route path='/users' element={<Users/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
