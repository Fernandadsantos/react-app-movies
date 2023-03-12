import axios from 'axios';

const ROOT_IMAGE = "http://image.tmdb.org/t/p/w500/";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
  });




export {api, ROOT_IMAGE};