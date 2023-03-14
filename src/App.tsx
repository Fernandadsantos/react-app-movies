import * as React from 'react';
import Albums from './pages/genres';
import Movies from './pages/movies';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Albums />,
  },
  {
    path: "/movies",
    element: <Movies />
  }
]);


function App() {
  
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
