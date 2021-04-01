import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import City from './pages/city/City';
import AddCity from './pages/city/AddCity';
import Home from './pages/home/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <main className="section">
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="create" element={<AddCity />} />
                <Route path=":cityName" element={<City />} />
            </Routes>
        </div>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
