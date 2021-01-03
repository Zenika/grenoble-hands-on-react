import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../utils/withRouter";
import LMap from "../../components/LMap";
import WeatherApi from "../../api/weather.api";
import Store from "../../store/Store";

interface IWeather {
  date: number;
  temp2m: { max: number; min: number };
  weather: string;
  wind10m_max: number;
}

interface IDetailedWeather {
  lifted_index: number;
  prec_amount: number;
  prec_type: string;
  rh2m: string;
  temp2m: number;
  timepoint: number;
  weather: string;
  wind10m: {
    direction: string;
    speed: number;
  };
}

interface ICityProps {
  params: {
    cityName: string;
  };
}

interface ICityState {
  cityName: string;
  displayInCelcius: boolean;
  displaySimpleForecast: boolean;
  cityLatitude?: number;
  cityLongitude?: number;
  weather?: IWeather[];
  detailedWeather?: IDetailedWeather[];
}

class City extends React.Component<ICityProps, ICityState> {
  mounted = false;

  constructor(props: ICityProps) {
    super(props);
    this.state = {
      cityLatitude: undefined,
      cityLongitude: undefined,
      weather: undefined,
      detailedWeather: undefined,
      cityName: "",
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
    const { long, lat } = Store.getCityPosition(this.props.params.cityName);
    this.setState({
      cityLatitude: lat,
      cityLongitude: long,
    });
    WeatherApi.getCityNextWeekWeather(long, lat).then((result) => {
      if (this.mounted) {
        this.setState({
          weather: result,
        });
      }
    });
    WeatherApi.getDetailedCityWeather(long, lat).then((result) => {
      if (this.mounted) {
        this.setState({
          detailedWeather: result,
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <>
        <h1 className="title">Cities weather</h1>
        <article className="panel is-primary">
          <div className="panel-heading">
            <h2>{this.state.cityName}</h2>
          </div>
          <div className="panel-block">
            {this.state.cityLatitude && this.state.cityLongitude && (
              <LMap
                lat={this.state.cityLatitude}
                long={this.state.cityLongitude}
              />
            )}
          </div>
          <div className="panel-block">
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="degree"
                  value="C"
                  checked={this.state.displayInCelcius}
                  onChange={this.handleOptionChange}
                />
                C°
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="degree"
                  value="F"
                  checked={!this.state.displayInCelcius}
                  onChange={this.handleOptionChange}
                />
                F°
              </label>
            </div>
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="mode"
                  value="simple"
                  checked={this.state.displaySimpleForecast}
                  onChange={this.handleModeChange}
                />
                Simple
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="mode"
                  value="detailed"
                  checked={!this.state.displaySimpleForecast}
                  onChange={this.handleModeChange}
                />
                Detailed
              </label>
            </div>
          </div>
          {this.state.displaySimpleForecast ? (
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
                  {this.state.weather?.map((weather) => (
                    <tr key={weather.date}>
                      <td>{weather.date}</td>
                      <td>
                        <img
                          src={
                            "http://www.7timer.info/img/misc/about_civil_" +
                            weather.weather +
                            ".png"
                          }
                          alt=""
                        />
                      </td>
                      <td>{this.formatTemp(weather.temp2m.min)}</td>
                      <td>{this.formatTemp(weather.temp2m.max)}</td>
                    </tr>
                  )) ?? <p>Loading ...</p>}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="panel-block">
              {this.state.detailedWeather ? (
                <table className="table is-flex-grow-1">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Weather</th>
                      <th>Temp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.detailedWeather.map((weather) => (
                      <tr key={weather.timepoint}>
                        <td>{weather.timepoint}h from now</td>
                        <td>
                          <img
                            src={
                              "http://www.7timer.info/img/misc/about_civil_" +
                              weather.weather +
                              ".png"
                            }
                            alt=""
                          />
                        </td>
                        <td>{this.formatTemp(weather.temp2m)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
          <div className="panel-block">
            <Link to="/" className="button is-rounded">
              Go back home
            </Link>
          </div>
        </article>
      </>
    );
  }

  handleOptionChange: React.ChangeEventHandler<{ value: string }> = (
    changeEvent
  ) => {
    this.setState({
      displayInCelcius: changeEvent.target.value === "C",
    });
  };

  handleModeChange: React.ChangeEventHandler<{ value: string }> = (
    changeEvent
  ) => {
    this.setState({
      displaySimpleForecast: changeEvent.target.value === "simple",
    });
  };

  formatTemp(temperatureInCelcius: number) {
    return this.state.displayInCelcius
      ? `${temperatureInCelcius}°C`
      : `${(temperatureInCelcius * 9) / 5 + 32}°F`;
  }
}

export default withRouter(City);
