import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.less'
import Home from './Home'
import WebglFilter from './component/WebglFilter'
import Vector from './vector/vector';
import Performance from './performance/performance' 


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
            <li>
              <Link to="/vector">vector</Link>
            </li>
            <li>
              <Link to="/performance">Performance</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/webglFilter" exact component={WebglFilter} />
        <Route path="/vector" exact component={Vector} />
        <Route path="/performance" exact component={Performance} />
      </main>
    </Router>
  )
}

export default App