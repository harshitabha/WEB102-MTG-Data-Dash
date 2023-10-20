/* eslint-disable react/prop-types */
const SlideFilter = (props) => {
    return (
        <div className="slide-container">
            <input type="range" min={props.min} max={props.max} value="50" className="slider" id={props.label}/>
        </div>
    );
}

export default SlideFilter;