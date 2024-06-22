import React, { useState, useEffect, useRef } from "react"
import Income from "../M-Data/Income"
import { Link, json, useLocation } from "react-router-dom"
import axios from "axios"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFilm,
  faL,
  faLightbulb,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons"
import ExpTrack from "./ExpTrack"
import IncomeTrack from "./IncomeTrack"
import MoneySavingTips from "./MoneySavingTips"

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

const DashSide = ({ user }) => {
  const [showChart, setShowChart] = useState(false) // State to control the visibility of the expenses chart
  const [showIncomeChart, setShowIncomeChart] = useState(false) // State to control the visibility of the income chart
  const [showSummary, setShowSummary] = useState(false) // State to control the visibility of the summary section
  const [leftSidebarMinimized, setLeftSidebarMinimized] = useState(false) // State to control the left sidebar minimization
  const [rightSidebarMinimized, setRightSidebarMinimized] = useState(false) // State to control the right sidebar minimization

  const [showAi, setShowAi] = useState(false)

  // State for user-defined budgets
  const [userBudgets, setUserBudgets] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)

  const [details, setDetails] = useState({
    user: {},
    incomes: [],
    expenses: [],
    budgets: [],
  })
  const preDetails = useRef(details)
  useEffect(() => {
    const fetchDetails = async () => {
      if (!user.id) return
      try {
        const response = await axios.get(
          `https://profitpulse-backend.onrender.com/ai/${user.id}`
        )
        setDetails(response.data)
        setTotalIncome(response.data.user.totalIncome)
        setTotalExpense(response.data.user.totalExpense)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDetails()
  }, [user.id])

  // Monthly expenses data
  const MonthlyExpenses = [
    { month: "January", amount: 1200 },
    { month: "February", amount: 900 },
    { month: "March", amount: 1100 },
    { month: "April", amount: 950 },
    { month: "May", amount: 1300 },
    { month: "June", amount: 1250 },
    { month: "July", amount: 1400 },
    { month: "August", amount: 1150 },
    { month: "September", amount: 1600 },
    { month: "October", amount: 1500 },
    { month: "November", amount: 1700 },
    { month: "December", amount: 1900 },
  ]
  // Monthly income data
  const MonthlyIncome = [
    { month: "January", amount: 2000, description: "Salary" },
    { month: "February", amount: 2400, description: "Performance Bonus" },
    { month: "March", amount: 2000, description: "Salary Adjustment" },
    { month: "April", amount: 2600, description: "Project Incentive" },
    { month: "May", amount: 2750, description: "Base Compensation" },
    { month: "June", amount: 1800, description: "Quarterly Bonus" },
    { month: "July", amount: 2500, description: "Monthly Payroll" },
    { month: "August", amount: 3000, description: "Employee Compensation" },
    { month: "September", amount: 3250, description: "Paycheck" },
    { month: "October", amount: 2450, description: "Wage" },
    {
      month: "November",
      amount: 3200,
      description: "Year-End Performance Bonus",
    },
    { month: "December", amount: 3400, description: "Holiday Bonus" },
  ]

  // Example budget limits
  const BudgetLimits = [
    { month: "January", limit: 1500 },
    { month: "February", limit: 1200 },
    { month: "March", limit: 1400 },
    { month: "April", limit: 1100 },
    { month: "May", limit: 1600 },
    { month: "June", limit: 1500 },
    { month: "July", limit: 1700 },
    { month: "August", limit: 1300 },
    { month: "September", limit: 1800 },
    { month: "October", limit: 1700 },
    { month: "November", limit: 1900 },
    { month: "December", limit: 2000 },
  ]

  // Define a color palette for the charts
  const colors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ]

  // Define border colors for the charts
  const borderColors = colors.map((color) => color.replace("0.6", "1"))

  // Chart data for expenses bar chart
  const chartData = {
    labels: MonthlyExpenses.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Expenses",
        data: MonthlyExpenses.map((item) => item.amount),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
        barThickness: 15, // Adjust bar thickness here
      },
    ],
  }

  // Chart data for income bar chart with custom tooltips
  const incomeChartData = {
    labels: MonthlyIncome.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Income",
        data: MonthlyIncome.map((item) => item.amount),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
        barThickness: 15, // Adjust bar thickness here
      },
    ],
  }

  // Custom tooltip callback to show descriptions

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
            weight: "500",
          },
          color: "#333", // Dark color
        },
      },
      y: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
          },
          color: "#333", // Dark color
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label
            const dataIndex = context.dataIndex
            const amount = context.dataset.data[dataIndex]
            let description
            if (label === "Monthly Income") {
              description = MonthlyIncome[dataIndex].description
              return `Income: ${description}: $${amount}`
            } else {
              description = MonthlyExpenses[dataIndex].description
              return `Expense: ${description}: $${amount}`
            }
          },
        },
        backgroundColor: "rgba(33, 33, 33, 0.8)",
      },
    },
  }
  const summaryChartOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
            weight: "500",
          },
          color: "#333", // Dark color
        },
      },
      y: {
        ticks: {
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
          },
          color: "#333", // Dark color
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context, details) {
            const label = context.dataset.label
            const dataIndex = context.dataIndex
            const amount = context.dataset.data[dataIndex]

            if (label === "Amount Spent") {
              return `Budget Amount: BD${amount}`
            }
            if (label === "Budget Limit") {
              return `Budget Limit: BD${amount}`
            }
          },
        },
        backgroundColor: "rgba(33, 33, 33, 0.8)",
      },
    },
  }

  // Extract category from the URL using useLocation
  const location = useLocation()
  const category = location.pathname.split("/")[1] // Assumes the URL structure is "/category"

  // Effect to toggle chart visibility based on URL category
  useEffect(() => {
    if (category === "ExpTracker") {
      setShowChart(true)
      setShowIncomeChart(false)
      setShowSummary(false)
      setShowAi(false)
    } else if (category === "IncomeTrack") {
      setShowChart(false)
      setShowIncomeChart(true)
      setShowSummary(false)
      setShowAi(false)
    } else if (category === "Summary") {
      setShowChart(false)
      setShowIncomeChart(false)
      setShowSummary(true)
      setShowAi(false)
    } else if (category === "PulseAi") {
      setShowChart(false)
      setShowIncomeChart(false)
      setShowSummary(false)
      setShowAi(true)
    } else {
      setShowChart(false)
      setShowIncomeChart(false)
      setShowSummary(false)
      setShowAi(false)
    }
  }, [category])

  // Toggle sidebar minimization
  const toggleSidebar = (side) => {
    if (side === "left") {
      setLeftSidebarMinimized(!leftSidebarMinimized)
    } else if (side === "right") {
      setRightSidebarMinimized(!rightSidebarMinimized)
    }
  }

  // Updated summary chart data with user budgets
  const updatedSummaryChartData = {
    labels: details.budgets.map((item) => item.name),
    datasets: [
      {
        label: "Budget Limit",
        data: details.budgets.map((item) => item.limit),
        backgroundColor: colors[2],
        borderColor: borderColors[2],
        borderWidth: 1,
        barThickness: 15,
      },
      {
        label: "Amount Spent",
        data: details.budgets.map((item) => item.amount),
        backgroundColor: colors[0],
        borderColor: borderColors[0],
        borderWidth: 1,
        barThickness: 15,
      },
    ],
  }

  return (
    <div>
      {/* Dashboard layout */}
      <div className="dashboard"></div>

      <div className="dash-container">
        {/* Left sidebar */}
        <div
          className={`sidebar left-sidebar ${
            leftSidebarMinimized ? "minimized" : ""
          }`}
        >
          <button className="toggle-btn" onClick={() => toggleSidebar("left")}>
            {leftSidebarMinimized ? ">" : "<"}
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
              <Link to="/Summary">Budget Track</Link>
            </li>
            <li>
              <Link to="/PulseAi">PulseAI</Link>
            </li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="content">
          {!showChart &&
            !showIncomeChart &&
            !showSummary &&
            !showAi && ( // Wrap everything in the condition
              <>
                <div className="dashboard-card-container">
                  <div className="dashboard-card">
                    <h2>Total Income</h2>
                    <p>{totalIncome} BD</p>
                  </div>
                  <div className="dashboard-card">
                    <h2>Total Expense</h2>
                    <p>{totalExpense} BD</p>
                  </div>
                </div>
                <div className="chart-container">
                  <div className="chart">
                    <ExpTrack user={user} details={details} />
                  </div>
                  <div className="chart">
                    <h2 style={{ textAlign: "center", marginBottom: "100px" }}>
                      Budgets
                    </h2>
                    <Bar
                      data={updatedSummaryChartData}
                      options={summaryChartOptions}
                      style={{ width: "400px", height: "300px" }}
                    />
                  </div>
                  <div className="chart">
                    <IncomeTrack user={user} details={details} />
                  </div>
                </div>
              </>
            )}
          {showChart && (
            <>
              <h1>Expense Tracker</h1>
              <p>
                ExpTracker visualizes your expenses, helping you track spending
                habits, and manage your budget effectively. The Pie chart below
                highlights your expenses, showing fluctuations and potential
                savings areas. Use this tool to achieve your financial goals.
              </p>
              <div className="chart-container">
                <div className="chart">
                  <Bar
                    data={chartData}
                    options={chartOptions}
                    style={{ height: "300px" }}
                  />
                </div>
                <div className="chart">
                  <ExpTrack user={user} details={details} />
                </div>
              </div>
            </>
          )}

          {showIncomeChart && (
            <>
              <h1>Income Tracker</h1>
              <p>
                Income Tracker displays your income, helping you monitor your
                earnings and plan your finances accordingly. The Doughnut chart
                below shows your income distribution, highlighting different
                sources of income. Use this tool to achieve your financial
                goals.
              </p>
              <div className="chart-container">
                <div className="chart">
                  <Bar
                    data={incomeChartData}
                    options={chartOptions}
                    style={{ width: "400px", height: "300px" }}
                  />
                </div>

                <div className="chart">
                  <IncomeTrack user={user} details={details} />
                </div>
              </div>
            </>
          )}
          {showSummary && (
            <>
              <h1>Budget Tracker</h1>
              <p>
                Here you can see a summary of your financial information,
                including budget limits, expense insights, and income details.
                Use this summary to gain a holistic view of your financial
                health and make informed decisions.
              </p>
              <div className="chart-container">
                <div className="chart">
                  <Bar
                    data={updatedSummaryChartData}
                    options={summaryChartOptions}
                    style={{ width: "400px", height: "300px" }}
                  />
                </div>
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
          )}
          {showAi && (
            <>
              <h1>Welcome to Pulse AI</h1>
              <MoneySavingTips user={user} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashSide
// test
