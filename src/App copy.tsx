//import React, { useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import "./scss/_custom.scss"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainView from './views/main-view';
import Layout from './views/Layout';
import Home from './views/Home';
import Blogs from './views/Blogs';
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App(){


  return(
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="main" element={<MainView />} />
            </Route>
          </Routes>
      );
    }
  



export default App;
