import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
    return (
        <div className="headerContainer">
            <h1 className="title">MG Dash</h1>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" className="search" defaultValue="Search for a Card" />
        </div>
    );
}

export default Header;