import { useState } from "react"

function Forecast(props) {

    const forecastList = props.periods.map((period) => {
        let rainPercent = period.probabilityOfPrecipitation.value
        let rainCheck = rainPercent == null ? 0 : rainPercent

        switch(props.view) {
            case 'tiled':
                return (
                    <TiledForecastItem 
                    name={period.name}
                    isDay={period.isDaytime}
                    temp={period.temperature + "\u00B0"}
                    rain={rainCheck + "% \u2614"}
                    snippet={period.shortForecast}
                    icon={period.icon}
                    detail={period.detailedForecast}
                    time={period.startTime}
                    />
                )

            case 'list':
                return (
                    <ListForecastItem 
                    name={period.name}
                    isDay={period.isDaytime}
                    temp={period.temperature + "\u00B0"}
                    rain={rainCheck + "% \u2614"}
                    snippet={period.shortForecast}
                    icon={period.icon}
                    detail={period.detailedForecast}
                    time={period.startTime}
                    />
                )
        }
    })

    return(        
        <div className={props.view == 'list' ? "col-12 row justify-content-center" : "col-md-10 row justify-content-center"}>
            {forecastList}
        </div>
    )
}

function TiledForecastItem(props) {

    const [isHover, setIsHover] = useState(false)

    let date = props.time.slice(5,10)
    date = date.replace('-', '/')
    let image = props.icon.slice(0,-6)
    image += '400'
    let period = props.isDay ? ' day' : ' night'    
    
    function handleMouseIn() {
        setIsHover(true)
    }

    function handleMouseOut() {
        setIsHover(false)
    }

    return(
        <div className="col-sm-6 my-1">
            <div className="card drop-shadow"
            onMouseEnter={handleMouseIn}
            onMouseLeave={handleMouseOut}>
                <img src={image} alt={props.snippet + "image"} className="card-img-top bg-img" />
                <h1 className={"position-absolute temp" + period}>{props.temp}</h1>
                <h1 className={"card-title position-absolute period" + period}>{props.name}</h1>
                <div className="card-body">
                    <h2 className="card-title period">{date}</h2>
                    <h4 className="card-text">{props.snippet}</h4>
                    <h4 className="card-text">{props.rain}</h4>
                    <p className={'card-text' + (isHover ? ' shown' : ' hidden')}>{props.detail}</p>
                </div>
            </div>
        </div>
    )    
}

function ListForecastItem(props) {

    let date = props.time.slice(5,10)
    date = date.replace('-', '/')
    let image = props.icon.slice(0,-6)
    image += 'small'
    let period = props.isDay ? ' light' : ' dark'    

    return(
        <div className={"row col-12 py-1 uniform" + period}>
            <img src={image} alt={props.snippet + "image"} className="bg-img fill col-2" />
            <h1 className="col-2 end-line align-content-center fill"><strong>{date}</strong></h1>
            <h1 className="col-1 no-pad end-line align-content-center fill"><strong>{props.temp}</strong></h1>
            <h4 className="col-3 end-line align-content-center fill">{props.name}</h4>
            <div className="col-4 fill row">
                <p className="col-12 text-nowrap text-truncate text-left fs-6">{props.snippet}</p>
                <p className="col-12 text-nowrap text-left fs-6">{props.rain}</p>                
            </div>
        </div>
    )    
}

export default Forecast;