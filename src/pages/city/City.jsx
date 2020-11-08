import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from '../../utils/withRouter';
import LMap from '../../components/LMap';

class City extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            cityLatitude: 45.183916,
            cityLongitude: 5.703630,
        };
    }

    componentDidMount() {
        // STEP 1: you can fetch the weather of the city using the weather api

        // STEP 2: you can use the cityName param from the route by using :
        // this.props.match.params.cityName;
    }

    render() {
        return <>
            <h1 className="title">Cities weather</h1>
            <article className="panel is-primary">
            <div className="panel-heading"><h2>GRENOBLE</h2></div>
            <div className="panel-block">
                <LMap lat={this.state.cityLatitude} long={this.state.cityLongitude}/>
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