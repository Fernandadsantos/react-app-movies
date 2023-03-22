import * as React from 'react';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Modal from 'react-modal';
import { Movie, IMovieDetails } from '../../interfaces';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import {getImageRoot, api } from '../../api/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { checkIfSinopse, errorMessages, maxText } from '../../utils/format';
import CustomSlider from '../slider';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import imageAlternative from '../../assets/cinemaImg.jpeg'
import './cards.scss';

const theme = createTheme();


const useStyles = makeStyles(() => ({
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
        paddingTop: '56.25%', 
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function MovieDetails({ movie }: { movie: Movie }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState<IMovieDetails>({} as IMovieDetails)
    const [recommendations, setRecommendations] = React.useState<Movie[]>([]);

    const slideSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        nextArrow: <ArrowCircleRightIcon color='primary' />,
        prevArrow: <ArrowCircleLeftIcon color='primary' />
    }

    function checkSinopseMovie(overview: string | null | undefined) {

        if (!checkIfSinopse(overview)) {
            return errorMessages(1)
        } else {
            return maxText(overview, 100) + "..."
        }

    }


    async function getDetails() {
        const { data } = await api
            .get(`/movie/${movie.id}?&api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR`)

        const { data: { results } } = await api
            .get(`/movie/${movie.id}/recommendations?&api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR`)

        setDetails(data);
        setRecommendations(results);
    }

    React.useEffect(() => {
        getDetails()
    }, [])

    return (

        <React.Fragment >
            <CssBaseline />
            <Modal
                isOpen={open}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }, content: {
                            border: 'none',
                            width: 500,
                            padding: 40,
                            backgroundColor: '#141414',
                            margin: "auto",
                            marginTop: 50,
                        },
                    }}

                contentLabel={movie.title}

                id={movie.id.toString()}

                onRequestClose={() => setOpen(false)}
                ariaHideApp={
                    true}

                shouldFocusAfterRender={
                    true}

                shouldCloseOnOverlayClick={
                    true}

                shouldCloseOnEsc={
                    true}

                shouldReturnFocusAfterClose={
                    true}

                role={"dialog"}

                preventScroll={false}


            >
                <div style={{flexDirection:'row'}} >
                    <div> 
                         <Typography variant="h6" component="h2">
                            {movie.title}
                        </Typography>
                        <img src={getImageRoot() + movie.poster_path} style={{ objectFit: 'contain' }} alt="" width={300} height={400} />
                    </div>
                    <div>
                    <Typography sx={{ mt: 2 }}>
                        Titulo original: {details?.original_title}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Sinopse: {details?.overview}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Linguagem original:  {details?.original_language}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Data de lançamento: {details?.release_date}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Avaliação: {details?.vote_average?.toFixed(1)} &#11088;
                    </Typography>
                    </div>
                    <CustomSlider {...slideSettings}
                    >
                        {
                            recommendations.map((movie) => (

                                <div> 
                                    <img src={movie?.poster_path ? getImageRoot("w500") + movie?.poster_path : imageAlternative} className='movieList' alt=''/>
                                    <p className='movieTitleRecommendation'>
                                        {movie.title}
                                    </p>
                                </div>

                            ))
                        }

                    </CustomSlider>
                </div>

            </Modal>
            <div className='cardMovie'>
                <Card className={classes.card} onClick={() => setOpen(true)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={getImageRoot("w500") + movie.backdrop_path}
                        title={movie.title}

                    />
                    <CardContent className={classes.cardContent} >
                        <h2>
                            <span>{movie.title}</span>
                        </h2>
                        <Typography component='h3'>
                            <p>{checkSinopseMovie(movie.overview)}</p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment >
    )
}