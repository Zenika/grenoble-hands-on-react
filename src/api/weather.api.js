export function getCityNextWeekWeather(long, lat) {
  return fetch(
    `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`
  )
    .then((response) => response.json())
    .then((response) => response.dataseries)
}

export function getCityTodayWeather(long, lat) {
  return fetch(
    `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`
  )
    .then((response) => response.json())
    .then((response) => response.dataseries)
    .then((dataseries) => dataseries[0])
}

const WeatherApi = { getCityTodayWeather, getCityNextWeekWeather }

export default WeatherApi
