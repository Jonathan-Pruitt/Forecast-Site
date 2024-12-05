function Header(props) {
    return (
        <div className="text-center pb-3">
            <h1 className="header txt-underline">7 Day Forecast</h1>
            {props.location.loaded && <h2 className="header">{props.location.city + ", " + props.location.state}</h2>}
        </div>
    )
}

export default Header;