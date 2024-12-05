import React from "react";
import { useState } from "react";
import '../resources/nav.css';

function Navigator(props) {
    const [isDropdown, setIsDropdown] = useState(false)
    
    function handleIsDropdown() {
        setIsDropdown(state => !state)
    }//end method

    function handleSearch() {
        props.search(true)
        handleIsDropdown()
    }

    return (
        <div className="fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light">
            <button className="h-40" type="button" onClick={handleIsDropdown}>
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* isDropdown toggles the rendering of the entire navbar. End of codeblock on closing /di */}
                {/* {isDropdown && <div id="navbarNavDropdown"> */}
                <div id="navbarNavDropdown" className={isDropdown ? "shown" : "hidden h-40"}>
                    <ul className="navbar-nav">
                        <NavItem toggleDrop={handleIsDropdown} link="https://jonathan-pruitt.github.io/jonathanpruitt.github.io/" title="Github "/>
                        <ViewSelector toggleDrop={handleIsDropdown} view={props.view} link="#" title="Tiled View"/>
                        <ViewSelector toggleDrop={handleIsDropdown} view={props.view} link="#" title="List View"/>
                        <NavItem toggleDrop={handleIsDropdown} link="#contact" title="Contact"/>
                        <SearchPrompt title="Search" link="#" search={handleSearch}/>                        
                    </ul>
                </div> {/* CLOSING BRACE FOR 'isDropdown' */}
            </nav>
        </div>        
    )
}//end method

function NavItem(props) {
    let link = props.link
    let title = props.title
    let dropToggle = props.toggleDrop

    return (
        <li className="nav-item">
            <a onClick={dropToggle} className="nav-link" href={link}><strong>{title}</strong></a>
        </li>
    )

}//end method

function SearchPrompt(props) {
    let link = props.link
    let title = props.title

    return (
        <li className="nav-item">
            <a onClick={props.search} className="nav-link" href={link}><strong>{title} &#x1F50E;&#xFE0E;</strong></a>
        </li>
    )

}//end method

function ViewSelector(props) {
    let link = props.link
    let title = props.title
    let dropToggle = props.toggleDrop

    function handleView() {
        dropToggle()
        let newView = ""
        switch(title) {
            case "Tiled View":
                newView = 'tiled'
                break;
            
            case "List View":
                newView = 'list'
                break;
            default:
                newView = 'tiled'
                break;
        }
        props.view(newView)
    }

    return (
        <li className="nav-item">
            <a onClick={handleView} className="nav-link" href={link}><strong>{title}</strong></a>
        </li>
    )

}//end method

export default Navigator;