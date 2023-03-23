import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { api, getImageRoot } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Genre } from '../../interfaces';
import './genres.scss';
import defaultImage from '../../assets/defaultImg.jpeg';
import Poster from '../../components/poster';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ArrowScroll from '../../components/arrowScroll';

interface currentPoster {
  index?: number;
  cover?: string;
  defaultImage?: string;
  movieOverview?: string;
  movieTitle?: string;
}

interface formattedGenre extends Genre {
  index?: number;
  cover?: string;
  defaultImage?: string;
  movieOverview?: string;
  movieTitle?: string;
}


export default function Genres() {
  const navigate = useNavigate();
  const [listFormattedGenres, setListFormattedGenres] = React.useState<formattedGenre[]>([]);
  const [listGenres, setListGenres] = React.useState<Genre[]>([]);
  const [currentMoviePoster, setCurrentMoviePoster] = React.useState<currentPoster>({ cover: defaultImage });
  const [showScrollBtn, setShowScrollBtn] = React.useState(false);

  React.useEffect(() => {
    getGenresAndFormtting()
  }, [])

  React.useEffect(() => {
    const periodicGetRandomMoviePostSubscriber = setInterval(() => {
      getRandomPoster()
    }, 120000);
    return () => {
      clearInterval(periodicGetRandomMoviePostSubscriber)
    };
  }, [])

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= window.innerHeight / 2) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    })
  }, [])


  function scrollToTop(){
    window.scrollTo(0,0); 
  }

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
        defaultImage,
        movieTitle: foundMovieByGenre?.title,
        movieOverview: foundMovieByGenre?.overview,
      }
    })

    getRandomPoster()
    setListFormattedGenres(formattedGenres)
    setListGenres(formattedGenres)


  }
  function searchCategory({ target }: any) {
    const searchTerm = (target.value as string).normalize('NFD').replace(/[^a-zA-Z0-9]*/g, '');
    const resultSearch = listGenres.filter((category: Genre) => category.name.normalize('NFD').replace(/[^a-zA-Z0-9]*/g, '').toLocaleUpperCase().includes(searchTerm.toLocaleUpperCase()));
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
  function getRandomPoster() {
    const max = listFormattedGenres.length - 1;
    const min = 0;
    if (max > -1) {
      const numberPoster = Math.floor(Math.random() * (max - min) + min);
      const { movieTitle, movieOverview, cover } = listFormattedGenres[numberPoster];

      setCurrentMoviePoster({
        movieTitle, movieOverview, cover: cover
          ? getImageRoot() + cover
          : defaultImage
      });
    }
    else {
      setCurrentMoviePoster({ cover: defaultImage })
    }
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <main className='mainPage'>
        <Header title='Catalogo' onChange={searchCategory} />
        <section className='poster-genre'>
          <Poster  {...currentMoviePoster} />
        </section>

        <section className='sectionCards' >
          <Container maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={2}>
              {listFormattedGenres.map((genre) => (
                <Grid item key={genre.id} xs={12} sm={6} md={4}>
                  <div className='cardGenre' onClick={() => goToMoviesList(genre.id, genre.name)}>
                    <img
                      alt="genreImage"
                      className='genreImage'
                      src={genre.cover ? getImageRoot() + genre.cover : genre.defaultImage}
                    />
                    <div className='titleContainer'>
                      <h2 className='cardGenreTitle'>{genre.name}</h2>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
        < Footer />
      </main>
      {showScrollBtn ? <ArrowScroll onClick={scrollToTop}/> : null}
    </React.Fragment>
  );
}
