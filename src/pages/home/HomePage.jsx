import { useState } from 'react'
import { Link } from 'react-router-dom'
import Store from '../../store/Store'

export const HomePage = () => {
  const [cities] = useState(Store.getCities())

  return <section>
    <h1 className="title">Offices</h1>

    <div className="panel">
      {/* STEP 2 : itérer sur les villes en utilisant la fonction map pour produire plusieurs éléments <h2> */}
      <h2 className="panel-block p-0">
        <Link className="subtitle p-4 is-flex-grow-1" to={cities[0]}>
          {cities[0]}
        </Link>
      </h2>
    </div>
  </section>
}
