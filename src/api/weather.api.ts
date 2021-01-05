import { IDetailedWeather, IWeather } from "../types/WeatherTypes";


export function getCityNextWeekWeather(long: number, lat: number): Promise<IWeather[]> {
    return fetch(`http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`)
    .then(response => response.json())
    .then(response => response.dataseries)
}

export function getCityTodayWeather(long: number, lat: number): Promise<IWeather> {
    return fetch(`http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`)
    .then(response => response.json())
    .then(response => response.dataseries)
    .then(dataseries => dataseries[0])
}

export function getDetailedCityWeather(long: number, lat: number): Promise<IDetailedWeather[]> {
    return fetch(`http://www.7timer.info/bin/civil.php?lon=${long}&lat=${lat}&unit=metric&output=json`)
    .then(response => response.json())
    .then(response => response.dataseries)
}

const WeatherApi = { getCityTodayWeather, getCityNextWeekWeather, getDetailedCityWeather };

export default WeatherApi;