import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LMap } from '../../components/LMap'
import { getCityTodayWeather } from '../../api/weather.api'
import { displayDate } from '../../utils/datetime.util.js'
import './CityPage.css'

/* eslint-disable */
import Store from '../../store/Store'
/* eslint-enable */

export const CityPage = () => {
  const { cityName } = useParams()
  // STEP 2 : Utiliser la variable cityName pour récupérer la latitude et la longitude depuis l'objet Store (déjà importé)
  const [longitude] = useState(5.70363)
  const [latitude] = useState(45.183916)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getCityTodayWeather(longitude, latitude)
      .then((weather) => setWeather(weather))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <h2 className="title">Cities weather</h2>
      <article className="panel is-primary">
        <div className="panel-heading">
          <h2>{cityName}</h2>
        </div>
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
              {weather && (
                <tr>
                  <td>{displayDate(weather.date)}</td>
                  <td>
                    <img
                      src={`http://www.7timer.info/img/misc/about_civil_${weather.weather}.png`}
                      alt="meteo_image"
                      className="cropped-image"
                      width={80}
                    />
                  </td>
                  <td>{weather.temp2m.min} °C</td>
                  <td>{weather.temp2m.max} °C</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="panel-block">
          <Link to="/">
            <button className="button is-primary is-outlined">
              Go back home
            </button>
          </Link>
        </div>
      </article>
    </>
  )
}
