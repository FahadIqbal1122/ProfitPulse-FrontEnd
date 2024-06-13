import React from 'react'
import '../../App'
import { Link } from 'react-router-dom'

const DashSide = () => {
  return (
    <div>
      <div className="content">
        <h1>Welcome to My App</h1>
        <p>This is the main content area.</p>
      </div>
      <div className="dash-container">
        <div className="sidebar left-sidebar">
          <h2></h2>
          <ul>
            <li>
              <a href="#exptrack">Expense Track</a>
            </li>
            <li>
              <a href="#incometrack">Income Track</a>
            </li>
            <li>
              <a href="#summary">Summary</a>
            </li>
          </ul>
        </div>

        <div className="sidebar right-sidebar">
          <h2></h2>
          <ul>
            <li>
              <Link to="/Budget">Budget</Link>
            </li>
            <li>
              <Link to="/Expense">Expense</Link>
            </li>
            <li>
              <Link to="/Income">Income</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashSide
