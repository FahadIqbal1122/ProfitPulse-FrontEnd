import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const DashSide = () => {
  const [showChart, setShowChart] = useState(false)
  const [leftSidebarMinimized, setLeftSidebarMinimized] = useState(false)
  const [rightSidebarMinimized, setRightSidebarMinimized] = useState(false)

  const MonthlyExpenses = [
    { month: 'January', amount: 1200 },
    { month: 'February', amount: 1500 },
    { month: 'March', amount: 1100 },
    { month: 'April', amount: 1700 },
    { month: 'May', amount: 1300 },
    { month: 'June', amount: 1600 }
  ]

  const chartData = {
    labels: MonthlyExpenses.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: MonthlyExpenses.map((item) => item.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  }

  const location = useLocation()
  const category = location.pathname.split('/')[1]

  useEffect(() => {
    if (category === 'ExpTracker') {
      setShowChart(true)
    } else {
      setShowChart(false)
    }
  }, [category])

  const toggleSidebar = (side) => {
    if (side === 'left') {
      setLeftSidebarMinimized(!leftSidebarMinimized)
    } else if (side === 'right') {
      setRightSidebarMinimized(!rightSidebarMinimized)
    }
  }

  return (
    <div>
      <header>
        <div className="logo-wrapper">
          <img
            src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
            alt="Logo"
            className="logo"
          />
          <h3>Dashboard</h3>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </header>
      <div className="dash-container">
        {/* Left sidebar */}
        <div
          className={`sidebar left-sidebar ${
            leftSidebarMinimized ? 'minimized' : ''
          }`}
        >
          <button className="toggle-btn" onClick={() => toggleSidebar('left')}>
            Toggle
          </button>
          <h2>Categories</h2>
          <ul>
            <li>
              <Link to="/ExpTracker">ExpTracker</Link>
            </li>
            <li>
              <Link to="/IncomeTrack">Income Track</Link>
            </li>
            <li>
              <Link to="/Summary">Summary</Link>
            </li>
          </ul>
        </div>

        <div
          className={`content ${leftSidebarMinimized ? 'minimized-left' : ''} ${
            rightSidebarMinimized ? 'minimized-right' : ''
          }`}
        >
          <h1>Welcome to My App</h1>
          <p>This is the main content area.</p>
          {showChart && (
            <div className="chart-container">
              <Bar
                data={chartData}
                style={{ width: '400px', height: '300px' }}
              />
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div
          className={`sidebar right-sidebar ${
            rightSidebarMinimized ? 'minimized' : ''
          }`}
        >
          <button className="toggle-btn" onClick={() => toggleSidebar('right')}>
            Toggle
          </button>
          <ul>
            <li>
              <Link to="/Budget">Budget</Link>
            </li>
            <li>
              <Link to="/dashboard/exptrack">ExpTrack</Link>
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
