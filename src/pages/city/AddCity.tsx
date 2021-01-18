import React from "react";
import Store from "../../store/Store";
import { IInjectedProps, withRouter } from "../../utils/withRouter";

type IError = { [K in keyof IAddCityState]?: string };

interface IAddCityState {
  name: string;
  latitude: string | number;
  longitude: string | number;
  error: IError;
}

class AddCity extends React.Component<IInjectedProps, IAddCityState> {
  constructor(props: IInjectedProps) {
    super(props);
    this.state = {
      name: "",
      latitude: "",
      longitude: "",
      error: {},
    };
  }

  render() {
    return (
      <>
        <h1 className="title">Create city</h1>

        <div className="card">
          <form
            className="card-content"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="City name"
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                />
              </div>
              {this.state.error.name && (
                <p className="help is-danger">Name is required</p>
              )}
            </div>
            <div className="field">
              <label className="label">Latitude</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="latitude"
                  placeholder="Latitude"
                  value={this.state.latitude}
                  onChange={this.handleChange("latitude")}
                />
              </div>
              {this.state.error.latitude && (
                <p className="help is-danger">
                  Latitude is required and must be &gt; -180 and &lt; 180
                </p>
              )}
            </div>
            <div className="field">
              <label className="label">Longitude</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="longitude"
                  placeholder="Longitude"
                  value={this.state.longitude}
                  onChange={this.handleChange("longitude")}
                />
              </div>
              {this.state.error.longitude && (
                <p className="help is-danger">
                  Longitude is required and must be &gt; -180 and &lt; 180
                </p>
              )}
            </div>
            <div className="control">
              <button
                type="submit"
                className="button is-primary"
                disabled={false}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  handleChange = (control: keyof IAddCityState) => (
    changeEvent: React.ChangeEvent<{ value: any }>
  ) => {
    this.setState({
      [control]: changeEvent.target.value,
    } as Pick<IAddCityState, "name" | "latitude" | "longitude">);
  };

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(this.state);

    const error: IError = {};

    if (!this.state.name.length) {
      error["name"] = "Name is required";
    }
    if (
      !(this.state.latitude as string).length ||
      this.state.latitude < -180 ||
      this.state.latitude > 180
    ) {
      error["latitude"] = "Latitude must be set between -90 and 90";
    }
    if (
      !(this.state.longitude as string).length ||
      this.state.longitude < -180 ||
      this.state.longitude > 180
    ) {
      error["longitude"] = "Longitude must be set between -180 and 180";
    }

    if (Object.keys(error).length !== 0) {
      this.setState({ error });
      return;
    } else {
      this.setState({ error: {} });
    }
    Store.addCity(
      this.state.name,
      this.state.latitude as number,
      this.state.longitude as number
    );
    this.props.navigate("..", { replace: true });
  }
}
export default withRouter(AddCity);