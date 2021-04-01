import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from '../../utils/withRouter';
import LMap from '../../components/LMap';
/* eslint-disable */
import WeatherApi from '../../api/weather.api';
import Store from '../../store/Store';
/* eslint-enable */

class City extends React.Component {
    mounted = false;

    constructor(state) {
        super(state);
        this.state = {
            cityLatitude: undefined,
            cityLongitude: undefined,
            weather: undefined,
            detailedWeather: undefined,
            cityName: '',
            displayInCelcius: true,
            displaySimpleForecast: true,
        };
    }

    componentDidMount() {
        this.mounted = true;
        // STEP 0 : affichage des données (data-binding) et cycle de vie (lifecycle)
        this.setState({
            cityName: this.props.params.cityName,
        });

        // STEP 2 : Utiliser la variable cityName pour récupérer la latitude et la longitude depuis l'objet Store (déjà importé) 
        const {long, lat} = Store.getCityPosition(this.props.params.cityName);
        this.setState({
            cityLatitude: lat,
            cityLongitude: long,
        });
        WeatherApi.getCityNextWeekWeather(long, lat).then((result) => {
            if (this.mounted) {
                this.setState({
                    weather: result
                });
            }
        });
        WeatherApi.getDetailedCityWeather(long, lat).then((result) => {
            if (this.mounted) {
                this.setState({
                    detailedWeather: result
                });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <>
            <h1 className="title">Cities weather</h1>
            <article className="panel is-primary">
            <div className="panel-heading"><h2>{this.state.cityName}</h2></div>
            <div className="panel-block">
                {this.state.cityLatitude && <LMap lat={this.state.cityLatitude} long={this.state.cityLongitude}/>}
            </div>
            <div className="panel-block">
                <div className="control">
                    <label htmlFor="celcius" className="radio">
                        <input type="radio" name="degree"
                            value="C"
                            id="celcius"
                            checked={this.state.displayInCelcius} 
                            onChange={this.handleOptionChange}
                            aria-controls="weather" />
                        C°
                    </label>
                    <label htmlFor="fahrenheit" className="radio">
                        <input type="radio" name="degree" 
                            value="F"
                            id="fahrenheit"
                            checked={!this.state.displayInCelcius} 
                            onChange={this.handleOptionChange}
                            aria-controls="weather" />
                        F°
                    </label>
                </div>
                <div className="control">
                    <label className="radio">
                        <input type="radio" name="mode"
                            value="simple"
                            checked={this.state.displaySimpleForecast} 
                            onChange={this.handleModeChange}
                            aria-controls="weather" />
                        Simple
                    </label>
                    <label className="radio">
                        <input type="radio" name="mode" 
                            value="detailed"
                            checked={!this.state.displaySimpleForecast} 
                            onChange={this.handleModeChange}
                            aria-controls="weather" />
                        Detailed
                    </label>
                </div>
            </div>
            {  
                this.state.displaySimpleForecast
                ? (
                    <div id="weather" role="region" className="panel-block" aria-live="polite">
                        {this.state.weather ? (<table className="table is-flex-grow-1">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Weather</th>
                                    <th scope="col">Min</th>
                                    <th scope="col">Max</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.weather.map(weather => (<tr key={weather.date}>
                                    <td>{this.formatDate(weather.date)}</td>
                                    <td><img src={'http://www.7timer.info/img/misc/about_civil_' + weather.weather + '.png'} alt={weather.weather} /></td>
                                    <td>{this.formatTemp(weather.temp2m.min)}</td>
                                    <td>{this.formatTemp(weather.temp2m.max)}</td>
                                </tr>))}
                            </tbody>
                        </table>) : (<p>Loading...</p>)}
                    </div>
                )
                : (
                    <div id="weather" role="region" className="panel-block" aria-live="polite">
                        {this.state.detailedWeather ? (<table className="table is-flex-grow-1">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Weather</th>
                                    <th scope="col"><abbr title="Temperature">Temp</abbr></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.detailedWeather.map(weather => (<tr key={weather.timepoint}>
                                    <td>{weather.timepoint}h from now</td>
                                    <td><img src={'http://www.7timer.info/img/misc/about_civil_' + weather.weather + '.png'} alt={weather.weather} /></td>
                                    <td>{this.formatTemp(weather.temp2m)}</td>
                                </tr>))}
                            </tbody>
                        </table>) : (<p>Loading...</p>)}
                    </div>
                )
            }
            <div className="panel-block">
                <Link to="/" className="button is-rounded">
                Go back home
                </Link>
            </div>
            </article>
        </>;
    }

    handleOptionChange = changeEvent => {
        this.setState({
          displayInCelcius: changeEvent.target.value === 'C',
        });
    };

    handleModeChange = changeEvent => {
        this.setState({
          displaySimpleForecast: changeEvent.target.value === 'simple',
        });
    };

    formatTemp(temperatureInCelcius) {
        return this.state.displayInCelcius ? `${temperatureInCelcius}°C` : `${temperatureInCelcius * 9 / 5 + 32}°F`;
    }

    formatDate(date) {
        const dateStr = date.toString();
        return `${dateStr.slice(6, 8)}/${dateStr.slice(4, 6)}/${dateStr.slice(0, 4)}`;
    }
}

export default withRouter(City);
