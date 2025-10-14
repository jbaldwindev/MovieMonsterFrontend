import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUpload from './Components/ImageUpload';
import Bio from './Components/Bio';
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
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UserValidation/>}/>
        <Route exact path="/Login" element={<UserValidation/>}/>
        <Route exact path="/Dashboard" element={<Dashboard/>}/>
        <Route exact path="/Movies" element={<Movies/>}/>
        <Route exact path="MovieSearch/:title" element={<MovieSearch/>}/>
        <Route exact path="/List/:accountName" element={<UserList/>}/>
        <Route exact path="/MyList" element={<UserList/>}/>
        <Route exact path="/Movie/:movieId" element={<Movie/>}/>
        <Route exact path="/display-friends/:username" element={<DisplayFriends/>}/>
        <Route exact path="Friends" element={<Friends/>}></Route>
        <Route exact path="Profile/:username" element={<Profile/>}/>
        <Route exact path="profile-picture" element={<ImageUpload/>}/>
        <Route exact path="Settings" element={<Settings/>}/>
        <Route exact path="/Favorites" element={<Favorites/>}/>
        <Route exact path="/Bio" element={<Bio/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
