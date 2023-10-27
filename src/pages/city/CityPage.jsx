import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LMap } from '../../components/LMap'
import {
  getCityDetailedWeather,
  getCityNextWeekWeather
} from '../../api/weather.api'
import { displayDate, displayHour } from '../../utils/datetime.util.js'
import Store from '../../store/Store'
import { useDegree } from '../../hooks/useDegree.js'
import { DetailedWeatherImage } from '../../components/DetailedWeatherImage.jsx'
import './CityPage.css'
import '../../components/CustomLoader.css'

export const CityPage = () => {
  const { cityName } = useParams()
  const { degree, setDegree, getTemperature } = useDegree()
  const { lat, long } = Store.getCityPosition(cityName)

  const [isLoading, setIsLoading] = useState(false)
  const [weathers, setWeathers] = useState([])
  const [detailedWeather, setDetailedWeather] = useState([])
  const [mode, setMode] = useState('simple')

  const fetchCityWeather = async () => {
    try {
      setIsLoading(true)
      const [weathersResponseFromApi, detailedWeatherResponseFromApi] =
        await Promise.all([
          await getCityNextWeekWeather(long, lat),
          await getCityDetailedWeather(long, lat),
          await new Promise((resolve) => setTimeout(resolve, 2_000))
        ])
      setWeathers(weathersResponseFromApi)
      setDetailedWeather(detailedWeatherResponseFromApi)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCityWeather()
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
        {isLoading ? (
          <div className="custom-loader" />
        ) : (
          <>
            <div className="panel-block is-flex is-justify-content-space-between is-align-items-center">
              <div className="buttons has-addons mt-0 mb-0">
                <button
                  onClick={() => setDegree('C')}
                  className={`button ${degree === 'C' ? 'is-primary' : ''}`}
                >
                  °C
                </button>
                <button
                  onClick={() => setDegree('F')}
                  className={`button ${degree === 'F' ? 'is-primary' : ''}`}
                >
                  °F
                </button>
              </div>

              <div className="buttons has-addons is-right mt-0 mb-0">
                <button
                  onClick={() => setMode('simple')}
                  className={`button ${mode === 'simple' ? 'is-primary' : ''}`}
                >
                  Simple
                </button>
                <button
                  onClick={() => setMode('detailed')}
                  className={`button ${
                    mode === 'detailed' ? 'is-primary' : ''
                  }`}
                >
                  Detailed
                </button>
              </div>
            </div>

            {mode === 'simple' && (
              <table className="table is-fullwidth">
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
                          className="cropped-image-day"
                          width={80}
                        />
                      </td>
                      <td>{getTemperature(weather.temp2m.min)}</td>
                      <td>{getTemperature(weather.temp2m.max)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {mode === 'detailed' && (
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Weather</th>
                    <th>Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedWeather.map((weatherPerDay, index) => (
                    <tr key={`${weatherPerDay}-${index}`}>
                      <td>{displayHour(weatherPerDay.timepoint)}</td>
                      <td>
                        <DetailedWeatherImage weather={weatherPerDay.weather} />
                      </td>
                      <td>{getTemperature(weatherPerDay.temp2m)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
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
