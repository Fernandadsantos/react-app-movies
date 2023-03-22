import './poster.scss';


const IMAGE_WIDTH = 1000; 

interface posterProps {
    cover?: string;
    movieTitle?: string;
    movieOverview?: string;
}


function Poster({ cover, movieTitle, movieOverview }: posterProps) {

    return (
        <div className='imageSection'>
            <img className='imgBackground' src={cover} alt="" />
            <div className='posterContent' style={{maxWidth: IMAGE_WIDTH}}>
                <h1 className='movieTitlePoster'>{movieTitle}</h1>
                <span className='movieOverviewPoster'>{movieOverview}</span>
            </div>

        </div>

    )

}

export default Poster;