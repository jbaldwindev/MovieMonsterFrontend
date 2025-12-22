import './App.css';
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthContext from "./Context/AuthContext";
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './Services/AxiosSetup';
import Dashboard from './Components/Dashboard';
import Movie from './Components/Movie';
import Movies from './Components/Movies';
import UserList from './Components/UserList';
import Friends from './Components/Friends';
import Profile from './Components/Profile';
import Settings from './Components/Settings';
import Favorites from './Components/Favorites';
import UserValidation from './Components/UserValidation';
import DisplayFriends from './Components/DisplayFriends';
import MovieSearch from './Components/MovieSearch';
import ImageUpload from './Components/ImageUpload';
import Bio from './Components/Bio';
import { useNavigate } from 'react-router-dom';
import logo from './Assets/MMLogo.png';
import { faRegular, library } from '@fortawesome/fontawesome-svg-core';
import { 
  faThumbsUp as fasThumbsUp, 
  faStar, 
  faAngleUp, 
  faAngleDown, 
  faAngleRight, 
  faAngleLeft, 
  faTrashCan, 
  faPlus, 
  faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faThumbsUp} from '@fortawesome/free-regular-svg-icons';

library.add(
  farStar, 
  faStar, 
  faAngleUp, 
  faAngleDown, 
  faAngleRight, 
  faAngleLeft, 
  faTrashCan, 
  faPlus, 
  faThumbsUp, 
  fasThumbsUp, 
  faXmark
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    api.get('/auth/me')
      .then(res => {
        setUser(res.data);
        if (window.location.pathname === "/" || window.location.pathname === "/login") {
          navigate("/dashboard");
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img className="mmlogo" src={logo}></img>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<UserValidation />} />
          <Route path="/login" element={<UserValidation />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/MovieSearch/:title" element={<MovieSearch />} />
            <Route path="/list/:accountName" element={<UserList />} />
            <Route path="/mylist" element={<UserList />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/display-friends/:username" element={<DisplayFriends />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile-picture" element={<ImageUpload />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/bio" element={<Bio />} />
          </Route>
        </Routes>
    </AuthContext.Provider>
  );
}

export default App;