import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Movie from './Components/Movie';
import Movies from './Components/Movies';
import UserList from './Components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faRegular, library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faAngleUp, faAngleDown, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';

library.add(farStar, faStar, faAngleUp, faAngleDown, faAngleRight, faAngleLeft);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup/>}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/Dashboard" element={<Dashboard/>}/>
        <Route exact path="/Movies" element={<Movies/>}/>
        <Route exact path="/List/:accountName" element={<UserList/>}/>
        <Route exact path="/MyList" element={<UserList/>}/>
        <Route exact path="/Movie/:movieId" element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
