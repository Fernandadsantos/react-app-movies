import * as React from 'react';
import Genres from './pages/genres';
import Movies from './pages/movies';
import Login from './pages/authentication/login'
import RecoverPassword from './pages/authentication/recoverPassword';
import RegisterUser from './pages/authentication/register';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/api/firebase";
import './App.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import  {setUser} from './redux/slicesReducers/userSlice';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"; 
import { RootState } from './redux/store';

function App() {
  const dispatch = useDispatch(); 
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const {user} = useSelector((state: RootState) => state.userSlice);

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) { 
        dispatch(setUser(currentUser))
      } else {
        dispatch(setUser(null))
      }
    });
  }, []) 

React.useEffect(()=>{
  setCurrentUser(user);
}, [user])

  return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={<Loading />} /> */}
        {
          currentUser
            ? <React.Fragment>
              <Route path="/" element={<Genres />} />
              <Route path="/movies" element={<Movies />} />
            </React.Fragment>

            : <React.Fragment>
              <Route path="/" element={<Login />} />
              <Route path="/signUp" element={<RegisterUser />} />
              <Route path="/recoverPassword" element={<RecoverPassword />} />
            </React.Fragment>

        }


      </Routes>
    </BrowserRouter>
  );
}

export default App;
function dispatch(arg0: { name: string; email: string; }) {
  throw new Error('Function not implemented.');
}

