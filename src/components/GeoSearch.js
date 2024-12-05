import { useEffect, useState } from "react";
import '../resources/geo.css';

// USE THIS API TO FIND GEOLOCATION

// EXAMPLE
// https://nominatim.openstreetmap.org/search.php?q=8610+kihnu&format=jsonv2

// FORM
// https://nominatim.openstreetmap.org/search?{{params}}

function GeoSearch(props) {
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [formData, setFormData] = useState({location : ""})
    const [responseArray, setResponseArray] = useState([])
    const [error, setError] = useState('')

    let limit = 0

    const list = responseArray.map(item => {
        if (item.display_name.includes('United States') && limit < 5) {
            limit++;
            return (
                <ResponseItem coords={{lat : item.lat, lon : item.lon}} name={item.display_name} setCoords={props.setCoords} reset={props.reset}/>
            )
        }
    })

    function handleChange(e) {
        const {name, value} = e.target
        setFormData({[name] : value})
    }

    useEffect(deriveLocation, [refreshTrigger])

    function deriveLocation() {
        if (formData.location === "") {return}

        /// INPUT DATA FORMATTING AND API CALL
        let location = formData.location.replace(" ", "+")

        /// https://nominatim.openstreetmap.org/search.php?q=8610+kihnu&format=jsonv2
        let query = `https://nominatim.openstreetmap.org/search.php?q=${location}&format=jsonv2`

        try {
            fetch(query)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(json => {
                setResponseArray(json)
            })
        } catch (err) {
            console.error(err + ": Please refresh the page")
        }

        if (responseArray.length === 0) {
            setError('ERROR: Forecasts can only be found for locations within the U.S.A.')
        } else {
            setError('')
        }
    }

    function findLocation(e) {
        e.preventDefault()
        setRefreshTrigger(prev => prev +1)
    }

    function handleExit(e) {
        if(!e.target.className.includes("list-item")) {
            setResponseArray([])
        }
        if (e.target.id === "outer" || e.target.id === "exit") {
            props.reset(false)
        }
    }

    return (
        <div onClick={handleExit} id="outer" className="fullscreen row justify-content-center">
            <div className="pop-up-box row">                
                <div className="col-12">
                    <h3 className="text-center txt-underline font-weight-bold">Search</h3>
                </div>
                <form className="col-12" onSubmit={findLocation}>
                    <div className="form-group">
                        <label htmlFor="location">Search Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" placeholder="Enter Location" />
                        <small className="form-text text-muted">Enter a street address, city, or zip code within the U.S.A.</small>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <h3 id="exit">X</h3>

                {responseArray.length > 0 &&
                <div className="row col-12 d-flex justify-content-center">
                    <div className="col-10 row response-list">
                        {list}
                    </div>
                </div>
                }

                <div className="col-12">
                    <p className="error-text">{error}</p>
                </div>
            </div>
        </div>
    )
}

function ResponseItem(props) {

    function handleSelect() {
        props.setCoords({loading : false, lat : props.coords.lat, lon : props.coords.lon})        
        props.reset(false)
    }

    return (
        <div className="col-12 list-item" onClick={handleSelect}>
            <p><strong>{props.name}</strong></p>
        </div>
    )
}

export default GeoSearch;