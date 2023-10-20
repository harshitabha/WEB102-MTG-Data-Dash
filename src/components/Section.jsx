/* eslint-disable react/prop-types */
import "./Section.css"

const Section = (props) => {
        
    return (
        <div className="section-container">
            <h2 className="section-header">{props.header}</h2>
            <hr />
            <ul>
                {props.content.map(item => {
                   return <li key="" className="table-elem">{item ? item : "N/A"}</li>
                })}
            </ul>
        </div>
    );
}

export default Section;