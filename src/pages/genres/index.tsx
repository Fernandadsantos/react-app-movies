import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { api, ROOT_IMAGE } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Genre, Movie } from '../../interfaces';
import './genres.scss'
import SearchBar from '../../components/search';
import { Breadcrumbs } from '@material-ui/core';
import { Maximize, Style } from '@material-ui/icons';



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

interface formattedGenre extends Genre {
  cover?: string;
  defaultImage?: string;
}

export default function Album() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [listFormattedGenres, setListFormattedGenres] = React.useState<formattedGenre[]>([]);
  const [listGenres, setListGenres] = React.useState<Genre[]>([]); 

  React.useEffect(() => {
    getGenresAndFormtting()
  }, [])

  async function getGenresAndFormtting() {
    const { data: { genres } } = await api
      .get("/genre/movie/list?api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR")


    const { data: { results } } = await api
      .get("/movie/popular?api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR")
 

    const formattedGenres = genres.map(({ id, name }: Genre) => {
      const foundMovieByGenre = results.find((movie: any) => movie.genre_ids.find((genreId: number) => genreId === id))
      return {
        id,
        name,
        cover: foundMovieByGenre?.backdrop_path,
        defaultImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2m5BZfIh54NvdcU3dU1RSoUMs8lDbJbjsgA&usqp=CAU"
      }
    })

    setListFormattedGenres(formattedGenres)
    setListGenres(formattedGenres)  

  }

  function searchCategory({ target }: any) {
    const searchTerm = target.value as string;
    const resultSearch = listGenres.filter((category: Genre) => category.name.toLocaleUpperCase().includes(searchTerm.toLocaleUpperCase()));

    setListFormattedGenres(resultSearch);

  }
  function goToMoviesList(id: number, name: string) {

    navigate("/movies",
      {
        state: {
          id,
          name
        }
      }
    )


  }


  return (
    <React.Fragment>
      <CssBaseline />
      <main className='mainPage'  >
        <AppBar className='hearder-index' color='transparent' >
          <div className='header-genres'>
            <Breadcrumbs >
              <Link underline='none' href='/' >
                <span className='header-title'>Catalogo</span>
              </Link>
            </Breadcrumbs>
            <SearchBar onChange={searchCategory} />
          </div>
        </AppBar>
        <section>
          <div>
            <img className='imgBackground' src="https://occ-0-4926-3851.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUIL2R5MjnaamkEbspAcgPjaz9nkln1L0Kll6Lu8w37WsIRh0Y7ts6Gfn0CfQ9SkkIYyQFqzx2DMaBQG2l7X7K2GWPuC7mylqX4h.jpg?r=ca8" alt=""  />
          </div>
        </section>
        <section  className='sectionCards' >
          <Container maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {listFormattedGenres.map((genre) => (
                <Grid item key={genre.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card} onClick={() => goToMoviesList(genre.id, genre.name)}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={genre.cover ? ROOT_IMAGE + genre.cover : genre.defaultImage}
                      title={genre.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <h2 className='cardMovie'>
                        <span >{genre.name}</span>
                      </h2>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
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
