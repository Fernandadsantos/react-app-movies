import glass from '../../assets/magnifying-glass.svg';
import './search.scss';

function SearchBar({ onChange }: any) {

    return (
        <div className="search-container">
            <img src={glass} alt="" className='search-icon' />
            <div className="search-box"> 
                <input className="search-txt" type="text" placeholder="Type to search" />
                
            </div>
        </div>
    )
    // return (
    //     <div className='search-container'>
    //         <input className='search-input' onChange={onChange} placeholder='Titulos, gêneros...' /><img src={glass} alt="" className='search-icon' />
    //     </div>
    // )
}

export default SearchBar;