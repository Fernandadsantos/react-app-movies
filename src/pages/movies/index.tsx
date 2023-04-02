import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { getImageRoot } from '../../api/axios';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import { Genre, Movie } from '../../interfaces';
import MovieDetails from '../../components/cards';
import './movies.scss';
import Poster from '../../components/poster';
import defaultImage from '../../assets/defaultImg.jpeg';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { fetchMovie } from '../../redux/slicesReducers/movieSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

interface currentPoster  {
  index?: number;
  cover?: string;
  defaultImage?: string;
  movieOverview?: string;
  movieTitle?: string;
}


export default function Movies() {
  const classes = useStyles();
  const [listMovies, setListMovies] = React.useState<Movie[]>([]);
  const [currentCategory, setCurrentCategory] = React.useState<Genre>({} as Genre);
  const [moviesToSearch, setMoviesToSearch] = React.useState<Movie[]>([]);
  const [currentMoviePoster, setCurrentMoviePoster] = React.useState<currentPoster>({cover: defaultImage});
  const params = useLocation();
  const {movie = [], loadingMovie} = useSelector((state: RootState) => state.movieSlice);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>(); 

  React.useEffect(()=> {
    if(movie && movie.length === 0 ){
      dispatch(fetchMovie());
    }
  }, [])

  React.useEffect(() => {
    if (params?.state) {
      const { state: { id, name } } = params;
      setCurrentCategory({ id, name })
    }
  }, [params])

  React.useEffect(() => {
    if (loadingMovie === 'succeeded') {
      getPopularMoviesByGenreId(currentCategory.id);
    }
  }, [loadingMovie, currentCategory.id])

  React.useEffect(()=>{ 
   const periodicGetRandomMoviePostSubscriber = setInterval(() => {
    getRandomMovie()
  },120000);
  return ()=> {
    clearInterval(periodicGetRandomMoviePostSubscriber)
  };
  }, [])

  async function getPopularMoviesByGenreId(genreId: number) {
   
    const filteredMovies = movie.filter((movie: any) => movie.genre_ids.includes(genreId));
    setListMovies(filteredMovies);
    setMoviesToSearch(filteredMovies);
    getRandomMovie()
  }

  function searchMovie({ target }: any) {

    const movieSearch = (target.value as string).normalize('NFD').replace(/[^a-zA-Z0-9]*/g, '')
    const listOfMovies = moviesToSearch.filter((movie) => movie.title.normalize('NFD').replace(/[^a-zA-Z0-9]*/g, '').toLocaleUpperCase().includes(movieSearch.toLocaleUpperCase()));
    setListMovies(listOfMovies);
  }

  function getRandomMovie() {
    const max = listMovies.length - 1;
    const min = 0;
    if (max > -1) {
      const numberPoster = Math.floor(Math.random() * (max - min) + min);
      setCurrentMoviePoster({...listMovies[numberPoster], cover: listMovies[numberPoster]?.backdrop_path
        ? getImageRoot() + listMovies[numberPoster]?.backdrop_path
        : defaultImage});
    }
    else{
      setCurrentMoviePoster({cover: defaultImage});
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header onChange={searchMovie}>
        <Breadcrumbs >
          <Link underline="none" href='/'>
            <span className='header-title-movie'>Catalogo</span>
          </Link>
          <Link
            underline="none"
            href="#"
          >
            <span className='header-title-movie'>Filmes</span>
          </Link>
        </Breadcrumbs>
      </Header>
      <main className='mainMovie'>
        <section className='category'>
          <Poster {...currentMoviePoster} />
          <div className='divCategory'>
            <h2 className='currentCategory'>{currentCategory?.name}</h2>
          </div>
        </section>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listMovies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <MovieDetails key={movie.id} movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Footer />
      </main>
    </React.Fragment>
  );
}
