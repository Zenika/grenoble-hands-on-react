import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import City from './pages/city/City';
import Home from './pages/home/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <section className="section">
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path=":cityName" element={<City />} />
            </Routes>
          </div>
      </section>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
