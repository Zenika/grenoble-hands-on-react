import { Link } from 'react-router-dom'

export const NavBar = () => (
  <nav
    className="navbar is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <h1 className="title navbar-item">Zenika Cities weather</h1>
      </div>
      <div className="navbar-menu">
        <h2 className="navbar-item has-text-white">
          The best weather app in React
        </h2>
      </div>
      <div className="navbar-menu navbar-end">
        <Link className="navbar-item" to="/add-city">
          Add city
        </Link>
      </div>
    </div>
  </nav>
)
