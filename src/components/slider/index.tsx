import Slider, { Settings } from "react-slick"; 
import './slider.scss'
 



function CustomSlider(props: Settings){

return(
    <Slider {...props}>
        {props.children}
    </Slider>
)
}


export default CustomSlider;