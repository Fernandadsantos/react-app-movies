import './poster.scss';



interface posterProps {
    cover?: string;
    movieTitle?: string;
    movieOverview?: string;
}


function Poster({ cover, movieTitle, movieOverview }: posterProps) {

    return (
        <div className='imageSection'>
            <div className='posterContainer'>
            <img className='imgBackground' src={cover} alt="" />
            <div className='posterContent'>
                <h1 className='movieTitlePoster'>{movieTitle}</h1>
                <span className='movieOverviewPoster'>{movieOverview}</span>
            </div> 
            </div>
           
        </div>

    )

}

export default Poster;