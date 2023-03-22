import glass from '../../assets/magnifying-glass.svg';
import './search.scss';


function SearchBar({ onChange }: {onChange: React.ChangeEventHandler<HTMLInputElement> | undefined}) {

    return (
        <div className='search-container'>
            <input className='search-input' onChange={onChange} placeholder='Titulos, gêneros...' />
            <img src={glass} alt="" className='search-icon' />
        </div>
    )
}

export default SearchBar;