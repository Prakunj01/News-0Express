import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/commom/Header/Header';
import Footer from './components/commom/footer/Footer';
import HomePage from './components/Home/HomePage';
import SinglePage from './components/singlePage/SinglePage';
import CategoryPage from './components/categoryPage/CategoryPage';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SinglePage/:id" element={<SinglePage />} />
        <Route path="/CategoryPage/:category" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
