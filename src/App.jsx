import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';

function AppContent() {
  const [page, setPage] = useState('landing');

  if (page === 'landing') {
    return (
      <div className="background-image">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <AboutUs />
        <button className="get-started-btn" onClick={() => setPage('products')}>
          Get Started
        </button>
      </div>
    );
  }

  if (page === 'cart') {
    return <CartItem onContinue={() => setPage('products')} />;
  }

  return <ProductList onCartClick={() => setPage('cart')} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;