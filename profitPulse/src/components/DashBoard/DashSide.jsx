import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
<<<<<<< HEAD

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const DashSide = () => {
  const [showChart, setShowChart] = useState(false)
  const [leftSidebarMinimized, setLeftSidebarMinimized] = useState(false)
  const [rightSidebarMinimized, setRightSidebarMinimized] = useState(false)
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUtensils,
  faFilm,
  faLightbulb,
  faMoneyCheckAlt
} from '@fortawesome/free-solid-svg-icons'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

const DashSide = () => {
  const [showChart, setShowChart] = useState(false) // State to control the visibility of the expenses chart
  const [showIncomeChart, setShowIncomeChart] = useState(false) // State to control the visibility of the income chart
  const [showSummary, setShowSummary] = useState(false) // State to control the visibility of the summary section
  const [leftSidebarMinimized, setLeftSidebarMinimized] = useState(false) // State to control the left sidebar minimization
  const [rightSidebarMinimized, setRightSidebarMinimized] = useState(false) // State to control the right sidebar minimization
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa

  // State for user-defined budgets
  const [userBudgets, setUserBudgets] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [newLimit, setNewLimit] = useState(0)
  const [newAmount, setNewAmount] = useState(0)

  // Monthly expenses data
  const MonthlyExpenses = [
    { month: 'January', amount: 1200 },
<<<<<<< HEAD
    { month: 'February', amount: 1500 },
    { month: 'March', amount: 1100 },
    { month: 'April', amount: 1700 },
    { month: 'May', amount: 1300 },
    { month: 'June', amount: 1600 }
=======
    { month: 'February', amount: 900 },
    { month: 'March', amount: 1100 },
    { month: 'April', amount: 950 },
    { month: 'May', amount: 1300 },
    { month: 'June', amount: 1250 },
    { month: 'July', amount: 1400 },
    { month: 'August', amount: 1150 },
    { month: 'September', amount: 1600 },
    { month: 'October', amount: 1500 },
    { month: 'November', amount: 1700 },
    { month: 'December', amount: 1900 }
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
  ]

  // Monthly income data
  const MonthlyIncome = [
    { month: 'January', amount: 2000, description: 'Salary' },
    { month: 'February', amount: 2400, description: 'Performance Bonus' },
    { month: 'March', amount: 2000, description: 'Salary Adjustment' },
    { month: 'April', amount: 2600, description: 'Project Incentive' },
    { month: 'May', amount: 2750, description: 'Base Compensation' },
    { month: 'June', amount: 1800, description: 'Quarterly Bonus' },
    { month: 'July', amount: 2500, description: 'Monthly Payroll' },
    { month: 'August', amount: 3000, description: 'Employee Compensation' },
    { month: 'September', amount: 3250, description: 'Paycheck' },
    { month: 'October', amount: 2450, description: 'Wage' },
    {
      month: 'November',
      amount: 3200,
      description: 'Year-End Performance Bonus'
    },
    { month: 'December', amount: 3400, description: 'Holiday Bonus' }
  ]

  // Example budget limits
  const BudgetLimits = [
    { month: 'January', limit: 1500 },
    { month: 'February', limit: 1200 },
    { month: 'March', limit: 1400 },
    { month: 'April', limit: 1100 },
    { month: 'May', limit: 1600 },
    { month: 'June', limit: 1500 },
    { month: 'July', limit: 1700 },
    { month: 'August', limit: 1300 },
    { month: 'September', limit: 1800 },
    { month: 'October', limit: 1700 },
    { month: 'November', limit: 1900 },
    { month: 'December', limit: 2000 }
  ]

  // Define a color palette for the charts
  const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
  ]

  // Define border colors for the charts
  const borderColors = colors.map((color) => color.replace('0.6', '1'))

  // Chart data for expenses bar chart
  const chartData = {
    labels: MonthlyExpenses.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: MonthlyExpenses.map((item) => item.amount),
<<<<<<< HEAD
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
=======
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
        barThickness: 15 // Adjust bar thickness here
      }
    ]
  }

  // Chart data for income bar chart with custom tooltips
  const incomeChartData = {
    labels: MonthlyIncome.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Income',
        data: MonthlyIncome.map((item) => item.amount),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
        barThickness: 15 // Adjust bar thickness here
      }
    ]
  }

  // Chart data for summary bar chart (expenses, income, and budget limit)
  const summaryChartData = {
    labels: MonthlyExpenses.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: MonthlyExpenses.map((item) => item.amount),
        backgroundColor: colors[0], // Color for expenses
        borderColor: borderColors[0],
        borderWidth: 1,
        barThickness: 15 // Adjust bar thickness here
      },
      {
        label: 'Monthly Income',
        data: MonthlyIncome.map((item) => item.amount),
        backgroundColor: colors[1], // Color for income
        borderColor: borderColors[1],
        borderWidth: 1,
        barThickness: 15 // Adjust bar thickness here
      },
      {
        label: 'Budget Limit',
        data: BudgetLimits.map((item) => item.limit),
        backgroundColor: colors[2], // Color for budget limit
        borderColor: borderColors[2],
        borderWidth: 1,
        barThickness: 15 // Adjust bar thickness here
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
      }
    ]
  }

<<<<<<< HEAD
  const location = useLocation()
  const category = location.pathname.split('/')[1]

  useEffect(() => {
    if (category === 'ExpTracker') {
      setShowChart(true)
    } else {
      setShowChart(false)
=======
  // Custom tooltip callback to show descriptions
  const chartOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
            weight: '500'
          },
          color: '#333' // Dark color
        }
      },
      y: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif"
          },
          color: '#333' // Dark color
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const description = MonthlyIncome[context.dataIndex].description
            const amount = context.dataset.data[context.dataIndex]
            return `${description}: $${amount}`
          }
        },
        backgroundColor: 'rgba(33, 33, 33, 0.8)'
      }
    }
  }

  // Options for the summary chart (customize as needed)
  const summaryChartOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
            weight: '500'
          },
          color: '#333' // Dark color
        }
      },
      y: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif"
          },
          color: '#333' // Dark color
        }
      }
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(33, 33, 33, 0.8)'
      }
    }
  }

  // Extract category from the URL using useLocation
  const location = useLocation()
  const category = location.pathname.split('/')[1] // Assumes the URL structure is "/category"

  // Effect to toggle chart visibility based on URL category
  useEffect(() => {
    if (category === 'ExpTracker') {
      setShowChart(true)
      setShowIncomeChart(false)
      setShowSummary(false)
    } else if (category === 'IncomeTrack') {
      setShowChart(false)
      setShowIncomeChart(true)
      setShowSummary(false)
    } else if (category === 'Summary') {
      setShowChart(false)
      setShowIncomeChart(false)
      setShowSummary(true)
    } else {
      setShowChart(false)
      setShowIncomeChart(false)
      setShowSummary(false)
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
    }
  }, [category])

  // Toggle sidebar minimization
  const toggleSidebar = (side) => {
    if (side === 'left') {
      setLeftSidebarMinimized(!leftSidebarMinimized)
    } else if (side === 'right') {
      setRightSidebarMinimized(!rightSidebarMinimized)
    }
  }
<<<<<<< HEAD

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
=======

  // Add user-defined budget
  const addBudget = (e) => {
    e.preventDefault()
    setUserBudgets([
      ...userBudgets,
      { category: newCategory, limit: newLimit, amount: newAmount }
    ])
    setNewCategory('')
    setNewLimit(0)
    setNewAmount(0)
  }

  // Updated summary chart data with user budgets
  const updatedSummaryChartData = {
    labels: userBudgets.map((item) => item.category),
    datasets: [
      {
        label: 'Budget Limit',
        data: userBudgets.map((item) => item.limit),
        backgroundColor: colors[2], // Color for budget limit
        borderColor: borderColors[2],
        borderWidth: 1,
        barThickness: 15 // Adjust bar thickness here
      },
      {
        label: 'Amount Spent',
        data: userBudgets.map((item) => item.amount),
        backgroundColor: colors[0], // Color for amount spent
        borderColor: borderColors[0],
        borderWidth: 1,
        barThickness: 15 // Adjust bar thickness here
      }
    ]
  }
  // Icon mapping for budget categories
  const iconMap = {
    Food: faUtensils,
    Entertainment: faFilm,
    Utilities: faLightbulb,
    Income: faMoneyCheckAlt
  }

  return (
    <div>
      {/* Dashboard layout */}
      <div className="dashboard"></div>

>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
      <div className="dash-container">
        {/* Left sidebar */}
        <div
          className={`sidebar left-sidebar ${
            leftSidebarMinimized ? 'minimized' : ''
          }`}
        >
          <button className="toggle-btn" onClick={() => toggleSidebar('left')}>
<<<<<<< HEAD
            Toggle
=======
            {leftSidebarMinimized ? '>' : '<'}
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
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

<<<<<<< HEAD
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
=======
        {/* Main content area */}
        <div className="content">
          {showChart && (
            <>
              <h1>Welcome to My ExpTracker</h1>
              <p>
                ExpTracker visualizes your monthly expenses, helping you track
                spending habits, identify trends, and manage your budget
                effectively. The bar chart below highlights your expenses,
                showing fluctuations and potential savings areas. Use this tool
                to achieve your financial goals.
              </p>
              <div className="chart-container">
                <Bar
                  data={chartData}
                  options={chartOptions}
                  style={{ width: '400px', height: '300px' }}
                />
              </div>
            </>
          )}

          {showIncomeChart && (
            <>
              <h1>Welcome to Income Tracker</h1>
              <p>
                Income Tracker displays your monthly income, helping you monitor
                your earnings and plan your finances accordingly. The bar chart
                below shows your income distribution, highlighting different
                sources of income. Use this tool to achieve your financial
                goals.
              </p>
              <div className="chart-container">
                <Bar
                  data={incomeChartData}
                  options={chartOptions}
                  style={{ width: '400px', height: '300px' }}
                />
              </div>
            </>
          )}

          {showSummary && (
            <>
              <h1>Financial Summary</h1>
              <p>
                Here you can see a summary of your financial information,
                including budget limits, expense insights, and income details.
                Use this summary to gain a holistic view of your financial
                health and make informed decisions.
              </p>

              {/* Form to add user-defined budgets */}
              <form onSubmit={addBudget}>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category"
                  required
                />
                <input
                  type="number"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="Budget Limit"
                  required
                />
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="Amount Spent"
                  required
                />
                <button type="submit">Add Budget</button>
              </form>

              <div className="chart-container">
                <Bar
                  data={updatedSummaryChartData}
                  options={summaryChartOptions}
                  style={{ width: '400px', height: '300px' }}
                />
              </div>

              {/* Display budget categories with icons */}
              <div className="budget-categories">
                {userBudgets.map((budget, index) => (
                  <div key={index} className="budget-item">
                    <FontAwesomeIcon
                      icon={iconMap[budget.category]}
                      className="budget-icon"
                    />
                    <span className="category">{budget.category}</span>
                    <span className="amount">
                      Budget: ${budget.limit}
                      <br />
                      Amount Spent: ${budget.amount}
                    </span>
                  </div>
                ))}
              </div>
            </>
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
          )}
        </div>

        {/* Right sidebar */}
        <div
          className={`sidebar right-sidebar ${
            rightSidebarMinimized ? 'minimized' : ''
          }`}
        >
          <button className="toggle-btn" onClick={() => toggleSidebar('right')}>
<<<<<<< HEAD
            Toggle
=======
            {leftSidebarMinimized ? '<' : '>'}
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
          </button>
          <h2>Options</h2>
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
<<<<<<< HEAD
=======
// test
>>>>>>> 31210b887af838d9dcc5a736e408b579d9d20aaa
