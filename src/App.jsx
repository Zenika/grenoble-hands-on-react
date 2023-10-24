import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { CityPage } from './pages/city/CityPage.jsx'
import { HomePage } from './pages/home/HomePage.jsx'
import './App.css'

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />

      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path=":cityName" element={<CityPage />} />
          </Routes>
        </div>
      </section>

      <Footer />
    </BrowserRouter>
  )
}
