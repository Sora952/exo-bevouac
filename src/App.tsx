import React from 'react';
import './styles/App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { LayerContextProvider } from './context/LayerContext';

function App() {
  return (
    <div className="App">
      <LayerContextProvider>
        <Header />
        <Home />
      </LayerContextProvider>
    </div>
  );
}

export default App;
