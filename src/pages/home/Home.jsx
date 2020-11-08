import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const cities = ['GRENOBLE'];

    return <section>
        <h1 className="title">Offices</h1>

        <div className="panel">
            <Link className="panel-block p-4" to={cities[0]}>
                <h2 className="subtitle">{cities[0]}</h2>
            </Link>
        </div>
    </section>;
}

export default Home;