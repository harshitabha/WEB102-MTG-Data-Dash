/* eslint-disable react/prop-types */
import "./StatsBlock.css"

const StatsBlock = (props) => {
    return (
        <div className="stats-body dash-elem">
            <p className="stats-text">{props.info}</p>
            <p className="stats-type">{props.type}</p>
        </div>
    );
}

export default StatsBlock;