import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { api, ROOT_IMAGE } from '../../api/axios';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import { Genre, Movie } from '../../interfaces';
import MovieDetails from '../../components/Movie';
import './movies.scss'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Movie Catalog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


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



export default function Movies() {
  const classes = useStyles();
  const [listMovies, setListMovies] = React.useState<Movie[]>([]);
  const [currentCategory, setCurrentCategory] = React.useState<Genre>({} as Genre);
  const params = useLocation();

  React.useEffect(() => {
    const { state: { id, name} } = params;
    setCurrentCategory({ id, name})
    getPopularMoviesByGenreId(id);
  }, [params])

  async function getPopularMoviesByGenreId(genreId: number) {
    const { data: { results } } = await api
      .get("/movie/popular?api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR")

    const filteredMovies = results.filter((movie: any) => movie.genre_ids.includes(genreId));
    setListMovies(filteredMovies);
  }

  return (
    <React.Fragment>

      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Movie Catalog
          </Typography>
        </Toolbar>
      </AppBar>
            <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href='/'>
          Catalogo
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/movies"
        >
          Filmes
        </Link>
      </Breadcrumbs>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
               {currentCategory?.name}
            </Typography>
            {/* <div className='search-div'>
              <img src="./lupa.png" alt="" className='search-logo' width={25} height={25} />
              <input className='search-input' />
            </div> */}
          </Container>
        </div>
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
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          links
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
