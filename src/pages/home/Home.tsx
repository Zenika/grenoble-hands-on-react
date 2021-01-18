import React from "react";
import { Link } from "react-router-dom";
import Store from "../../store/Store";

interface IHomeState {
  cities: string[];
}

class Home extends React.Component<{}, IHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cities: Store.getCities(),
    };
  }

  render() {
    return (
      <section>
        <h1 className="title">Offices</h1>

        <div className="panel">
          {/* STEP 2 : itérer sur les villes en utilisant la fonction map pour produire plusieurs éléments <h2> */}
          {this.state.cities.map((city) => (
            <h2 className="panel-block p-0" key={city}>
              <Link className="subtitle p-4 is-flex-grow-1" to={city}>
                {city}
              </Link>
            </h2>
          ))}
        </div>
      </section>
    );
  }
}

export default Home;