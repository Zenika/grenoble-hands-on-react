import { useState } from 'react'
import { Link } from 'react-router-dom'
import Store from '../../store/Store'

export const HomePage = () => {
  const [cities] = useState(Store.getCities())

  return (
    <section>
      <h2 className="title">Offices</h2>
      <div className="panel">
        {cities.map((city) => (
          <Link to={city} key={city} className="panel-block p-4">
            <h2 className="subtitle">{city}</h2>
          </Link>
        ))}
      </div>
    </section>
  )
}
