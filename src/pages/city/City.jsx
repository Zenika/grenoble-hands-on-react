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
            cityLatitude: 45.183916,
            cityLongitude: 5.703630,
            weather: undefined,
            cityName: ''
        };
    }

    componentDidMount() {
        this.mounted = true;
        // STEP 0 : affichage des données (data-binding) et cycle de vie (lifecycle)
        this.setState({
            cityName: this.props.params.cityName,
        })

        // STEP 1 : Utiliser la méthode getCityTodayWeather de l'objet WeatherAPI (déjà importé) pour récuperer la météo
        WeatherApi.getCityTodayWeather(this.state.cityLongitude, this.state.cityLatitude).then((result) => {
            if (this.mounted) {
                this.setState({
                    weather: result
                });
            }
        });
        // STEP 2 : Utiliser la variable cityName pour récupérer la latitude et la longitude depuis l'objet Store (déjà importé) 
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
                <LMap lat={this.state.cityLatitude} long={this.state.cityLongitude}/>
            </div>
            <div className="panel-block">
                {this.state.weather ? (<table className="table is-flex-grow-1">
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
                            <td>{this.state.weather.date}</td>
                            <td><img src={'http://www.7timer.info/img/misc/about_civil_' + this.state.weather.weather + '.png'} alt="" /></td>
                            <td>{this.state.weather.temp2m.min}°C</td>
                            <td>{this.state.weather.temp2m.max}°C</td>
                        </tr>
                    </tbody>
                </table>) : (<p>Loading...</p>)}
            </div>
            <div className="panel-block">
                <Link to="/" className="button is-rounded">
                Go back home
                </Link>
            </div>
            </article>
        </>;
    }
}

export default withRouter(City);
