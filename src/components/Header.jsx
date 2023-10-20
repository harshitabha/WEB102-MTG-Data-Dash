import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import "./Header.css"

const Header = () => {
    return (
        <div className="headerContainer">
            <h1 className="title">Magic the Gathering</h1>
            <div className="searchContainer">
                <input type="text" className="search" placeholder="Search..." />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon'/>
            </div>
        </div>
    );
}

export default Header;