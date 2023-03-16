import glass from '../../assets/glass.png';
import './search.scss';

function SearchBar({element}: any){


    return (
        <div className='search-container'>
            <input className='search-input' onChange={element} placeholder='Titulos, gêneros...' /><img src={glass} alt="" className='search-icon' />
        </div>
    )
}

export default SearchBar;