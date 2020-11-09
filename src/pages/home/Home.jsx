import React from 'react';
import { Link } from 'react-router-dom';
import Store from '../../store/Store';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: Store.getCities(),
        }
    }

    render() {
        return <section>
            <h1 className="title">Offices</h1>

            <div className="panel">
                {/* STEP 2 : itérer sur les villes en utilisant la fonction map pour produire plusieurs éléments <h2> */}
                <h2 className="panel-block p-0">
                    <Link className="subtitle p-4 is-flex-grow-1" to={this.state.cities[0]}>
                        {this.state.cities[0]}
                    </Link>
                </h2>
            </div>
        </section>;
    }
}

export default Home;
