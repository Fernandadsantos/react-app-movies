import * as React from 'react';
import Genres from './pages/genres';
import Movies from './pages/movies';
import Login  from './pages/authentication/login'
import RecoverPassword from './pages/authentication/recoverPassword';
import RegisterUser from './pages/authentication/register';
import NewPassword from './pages/authentication/newPassword';
import './App.scss'; 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Genres />,
  },
  {
    path: "/movies",
    element: <Movies />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastrar",
    element: <RegisterUser />,
  },
  {
    path: "/recuperarSenha",
    element: <RecoverPassword />,
  },
  {
    path: "/novaSenha",
    element: <NewPassword />,
  },
]);


function App() { 
  return (
    <RouterProvider router={router} />
  );
}

export default App;
