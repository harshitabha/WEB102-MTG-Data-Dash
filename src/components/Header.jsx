/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import "./Header.css"

const Header = (props) => {
    return (
        <div className="headerContainer">
            <h1 className="title">Magic the Gathering</h1>
            <div className="searchContainer">
                <input 
                    type="text" 
                    className="search" 
                    placeholder="Search..."
                    value={props.searchVal} 
                    onChange={(e) => {props.change(e)}}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon'/>
            </div>
        </div>
    );
}

export default Header;