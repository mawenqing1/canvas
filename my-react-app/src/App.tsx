import React, { useEffect, useRef, useReducer } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.less'
import Home from './Home'
import WebglFilter from './component/WebglFilter'


function App() {
  return (
    <Router>
      <main>
        <nav className="routerLink" >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/webglFilter">WebglFilter</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/webglFilter" exact component={WebglFilter} />
      </main>
    </Router>
  )
}

export default App