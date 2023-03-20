import axios from 'axios';
  
function getImageRoot(imageSize = "original"){
  return "http://image.tmdb.org/t/p/" + imageSize;
}


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
  });




export {api, getImageRoot};