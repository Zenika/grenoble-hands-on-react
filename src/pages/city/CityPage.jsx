import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LMap } from '../../components/LMap'
/* eslint-disable */
import WeatherApi from '../../api/weather.api'
import Store from '../../store/Store'
import { displayDate } from '../../utils/datetime.util.js'

/* eslint-enable */

export const CityPage = () => {
  const { cityName } = useParams()
  const [latitude] = useState(45.183916)
  const [longitude] = useState(5.703630)
  const [weather] = useState({
    date: displayDate(20201025),
    weather: 'cloudy',
    temp2m: {
      max: 12,
      min: 7
    },
    wind10m_max: 2
  })

  // STEP 1 : Utiliser la méthode getCityTodayWeather de l'objet WeatherAPI (déjà importé) pour récupérer la météo

  // STEP 2 : Utiliser la variable cityName pour récupérer la latitude et la longitude depuis l'objet Store (déjà importé)

  return (
    <>
      <h1 className="title">Cities weather</h1>
      <article className="panel is-primary">
        <div className="panel-heading"><h2>{cityName}</h2></div>
        <div className="panel-block">
          <LMap latitude={latitude} longitude={longitude} />
        </div>
        <div className="panel-block">
          <table className="table is-flex-grow-1">
            <thead>
            <tr>
              <th>Date</th>
              <th>Weather</th>
              <th>Min</th>
              <th>Max</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{weather.date}</td>
              <td><img src={'http://www.7timer.info/img/misc/about_civil_' + weather.weather + '.png'} alt="" /></td>
              <td>0 °C</td>
              <td>30 °C</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="panel-block">
          <Link to="/">
            <button className="button is-primary is-outlined">Go back home</button>
          </Link>
        </div>
      </article>
    </>
  )
}
