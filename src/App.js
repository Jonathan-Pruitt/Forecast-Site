
/*
1. GET LATITUDE AND LONGITUDE
2. GET GRID
3. GET FORECAST

TEST LAT AND LONG
LAT -     29.424122
LONG -    -98.493629
Grid OFFICE- EWX
GRID X    126
GRID Y    54
*/

import Forecast from "./components/Forecast";
import Navigator from "./components/Navigator";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TopIcon from "./components/TopIcon";
import GeoSearch from "./components/GeoSearch";

import { useEffect, useState } from "react";

function App() {

  const [coords, setCoords] = useState({loading : true, lat : 0, lon : 0})  
  const [grid, setGrid] = useState({loaded : false})
  const [forecast, setForecast] = useState({loaded : false})
  const [view, setView] = useState('tiled')
  const [isSearching, setIsSearching] = useState(false)
  
  useEffect(reqBrowserCoords, [])
  useEffect(updateGrid, [coords])
  useEffect(updateForecast, [grid])
  useEffect(() => {
    if (window.innerWidth < 575) {
      setView('list')
    }
  }, [])
  
  function reqBrowserCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords)
    } else {
      console.error('Your browser does not support geolocation')
    }
  }//end request for browser coords

  function updateGrid() {
    if (!coords.loading) {
      try {
        fetch(`https://api.weather.gov/points/${coords.lat},${coords.lon}`)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((json) => {
          try {
            setGrid({
              id  : json.properties.gridId,
              x   : json.properties.gridX,
              y   : json.properties.gridY,
              city : json.properties.relativeLocation.properties.city,
              state : json.properties.relativeLocation.properties.state,
              loaded : true
            })
          } catch(error) {
            console.error("Provided coordinates appear to be outside of the scope of the USA National Weather Service\n",error)
            setGrid({
              loaded : false,
              city : 'ERROR',
              state : "Unable to load forecast. The National Weather Service only provides forecasts within the U.S.A."
            })
          }
        })
      } catch(err) {
        console.error('This location does not appear to be within the scope of the USA National Weather Service', err)
      }
    }
  }//end function
  
  function updateForecast() {
    if (grid.loaded) {
      try {
        fetch(`https://api.weather.gov/gridpoints/${grid.id}/${grid.x},${grid.y}/forecast`)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((json) => {
          try {
            setForecast(json.properties.periods)
          } catch(error) {
            console.error('An error was encountered trying to load the forecast', error)
          }
        })
      } catch(err) {
        console.error(err)
      }//end trycatch
    }//end if
  }//end function

  function getCoords(data) {
    setCoords({loading : false, lat : data.coords.latitude, lon : data.coords.longitude})
  }//end function

  return (
    <div id="top" className="container">
      <Navigator view={setView} search={setIsSearching}/>
      <div className="row d-flex justify-content-center post-nav">
        <Header location={grid}/>
        {forecast.loaded !== false && <Forecast periods={forecast} view={view}/>}
      </div>
      <Footer />
      <TopIcon />
      {isSearching && <GeoSearch reset={setIsSearching} setCoords={setCoords}/>}
    </div>
  );
}

export default App;
