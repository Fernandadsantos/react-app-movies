import * as React from 'react';
import Genres from './pages/genres';
import Movies from './pages/movies';
import Login from './pages/authentication/login'
import RecoverPassword from './pages/authentication/recoverPassword';
import RegisterUser from './pages/authentication/register';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/api/firebase";
import './App.scss'; 
import { useDispatch } from 'react-redux';
import userSlice from './redux/slicesReducers/userSlice';
import { getUserDate } from './redux/slicesReducers/userSlice';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Navigate,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom"; 

function App() {
  const [getUser, setUser] = React.useState<User | null>(null);  

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null)
      }
    });
  }, [])

  React.useEffect(() => { 
  },[])



  return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={<Loading />} /> */}
        {
          getUser
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

