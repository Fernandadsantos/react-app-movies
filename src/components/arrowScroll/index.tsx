import upArrow from '../../assets/up-arrow.png';
import './arrowScroll.scss';

 
function ScrollToTOp({onClick}: {onClick: React.MouseEventHandler<HTMLDivElement> | undefined}) {


    return (
        <div className='btn-container' onClick={onClick}>
            <button className='btn-scroll' >
                <img src={upArrow} alt="" className='imgScroll' />
            </button>
        </div>
    )
}

export default ScrollToTOp;