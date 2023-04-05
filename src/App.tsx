import * as React from 'react';
import Genres from './pages/genres';
import Movies from './pages/movies';
import Login  from './pages/authentication'
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
  }
]);


function App() { 
  return (
    <RouterProvider router={router} />
  );
}

export default App;
