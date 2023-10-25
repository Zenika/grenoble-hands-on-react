import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LMap } from '../../components/LMap'
import { getCityNextWeekWeather } from '../../api/weather.api'
import { displayDate } from '../../utils/datetime.util.js'
import Store from '../../store/Store'
import './CityPage.css'

export const CityPage = () => {
  const { cityName } = useParams()
  const { lat, long } = Store.getCityPosition(cityName)
  const [weathers, setWeathers] = useState([])

  useEffect(() => {
    getCityNextWeekWeather(long, lat)
      .then((weathers) => setWeathers(weathers))
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
          <LMap latitude={lat} longitude={long} />
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
              {weathers.map((weather, index) => (
                <tr key={`${weather}-${index}`}>
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
              ))}
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
