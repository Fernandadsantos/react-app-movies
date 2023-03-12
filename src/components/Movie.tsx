import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Movie, IMovieDetails } from '../interfaces';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import { ROOT_IMAGE, api } from '../api/axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { checkIfSinopse, errorMessages, maxText } from '../utils/format';
import { Style } from '@material-ui/icons';


const theme = createTheme();

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

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

export default function MovieDetails({ movie }: { movie: Movie }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState<IMovieDetails>({} as IMovieDetails)
    const [recommendations, setRecommendations] = React.useState<Movie[]>([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function checkSinopseMovie(overview: string | null | undefined) {

        if (!checkIfSinopse(overview)) {
            return errorMessages(1)
        } else {
            return maxText(overview, 100) + "..."
        }

    }

    React.useEffect(() => {
        getDetails()
    }, [])

    async function getDetails() {
        const { data } = await api
            .get(`/movie/${movie.id}?&api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR`)

        const { data: { results } } = await api
            .get(`/movie/${movie.id}/recommendations?&api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR`)

        setDetails(data);
        setRecommendations(results);
    }

    return (

        <React.Fragment>
            <CssBaseline />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {movie.title}
                    </Typography>
                    <img src={ROOT_IMAGE + movie.poster_path} style={{ objectFit: 'contain' }} alt="" width={300} height={400} />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Titulo original: {details?.original_title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Sinopse: {details?.overview}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Linguagem original:  {details?.original_language}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Data de lançamento: {details?.release_date}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Avaliação: {details?.vote_average} &#11088;
                    </Typography>
                    <Card className={classes.card} onClick={handleOpen}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={ROOT_IMAGE + movie.backdrop_path} 
                           
                        />
                        <CardContent className={classes.cardContent}>
                            <h2 className='genre-title'>
                                
                            </h2>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
            <Card className={classes.card} onClick={handleOpen}>
                <CardMedia
                    className={classes.cardMedia}
                    image={ROOT_IMAGE + movie.backdrop_path}
                    title={movie.title}
                />
                <CardContent className={classes.cardContent}>
                    <h2 className='genre-title'>
                        <span>{movie.title}</span>
                    </h2>
                    <Typography component='h3'>
                        <p>{checkSinopseMovie(movie.overview)}</p>
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}