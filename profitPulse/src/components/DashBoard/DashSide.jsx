import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
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

  const MonthlyIncome = [
    { month: "January", amount: 2000, description: "Salary" },
    { month: "February", amount: 2400, description: "Performance Bonus" },
    { month: "March", amount: 2000, description: "Salary Adjustment" },
    { month: "April", amount: 2400, description: "Project Incentive" },
    { month: "May", amount: 2750, description: "Base Compensation" },
    { month: "June", amount: 2900, description: "Quarterly Bonus" },
    { month: "July", amount: 3000, description: "Monthly Payroll" },
    { month: "August", amount: 3100, description: "Employee Compensation" },
    { month: "September", amount: 3050, description: "Paycheck" },
    { month: "October", amount: 3150, description: "Wage" },
    {
      month: "November",
      amount: 3200,
      description: "Year-End Performance Bonus",
    },
    { month: "December", amount: 3300, description: "Holiday Bonus" },
  ]
  const budgetLimit = 3000 // Example budget limit for each month

  // Calculate totals and balances
  const totalExpenses = MonthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )
  const totalIncome = MonthlyIncome.reduce(
    (sum, income) => sum + income.amount,
    0
  )
  const netBalance = totalIncome - totalExpenses

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
            const description = MonthlyIncome[context.dataIndex].description
            const amount = context.dataset.data[context.dataIndex]
            return `${description}: $${amount}`
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
    } else if (category === "IncomeTrack") {
      setShowChart(false)
      setShowIncomeChart(true)
    } else if (category === "Summary") {
      setShowChart(false)
      setShowIncomeChart(false)
      setShowSummary(true)
    } else {
      setShowChart(false)
      setShowIncomeChart(false)
    }
  }, [category])

  return (
    <div>
      {/* Dashboard layout */}
      <div className="dashboard"></div>
      <div className="dash-container">
        {/* Left sidebar */}
        <div className="sidebar left-sidebar">
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
                  style={{ width: "400px", height: "300px" }}
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
                  style={{ width: "400px", height: "300px" }}
                />
              </div>
            </>
          )}
        </div>

        {/* Right sidebar */}
        <div className="sidebar right-sidebar">
          <h2>Options</h2>
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
// import React, { useState } from "react"
// import { Link, useLocation } from "react-router-dom"
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js"
// import { Bar } from "react-chartjs-2"

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

// const DashSide = () => {
//   const [showChart, setShowChart] = useState(false) // Initialize to false

//   const MonthlyExpenses = [
//     { month: "January", amount: 1200 },
//     { month: "February", amount: 1500 },
//     { month: "March", amount: 1100 },
//     { month: "April", amount: 1700 },
//     { month: "May", amount: 1300 },
//     { month: "June", amount: 1600 },
//   ]

//   const chartData = {
//     labels: MonthlyExpenses.map((item) => item.month),
//     datasets: [
//       {
//         label: "Monthly Expenses",
//         data: MonthlyExpenses.map((item) => item.amount),
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   }

//   // Extract category from the URL using useLocation
//   const location = useLocation()
//   const category = location.pathname.split("/")[1] // Assumes "/category"

//   // Effect to show chart based on category
//   React.useEffect(() => {
//     if (category === "ExpTracker") {
//       setShowChart(true)
//     } else {
//       setShowChart(false)
//     }
//   }, [category])

//   return (
//     <div>
//       {/* Dashboard layout */}
//       <div className="dashboard"></div>
//       <div className="content">
//         <h1>Welcome to My ExpTracker</h1>
//         <p>
//           Our ExpTracker visualizes your monthly expenses, helping you track
//           spending habits, identify trends, and manage your budget effectively.
//           The bar chart below highlights your expenses, showing fluctuations and
//           potential savings areas. Use this tool to achieve your financial
//           goals.
//         </p>
//       </div>
//       <div className="dash-container">
//         {/* Left sidebar */}
//         <div className="sidebar left-sidebar">
//           <h2>Categories</h2>
//           <ul>
//             <li>
//               <Link to="/ExpTracker">ExpTracker</Link>
//             </li>
//             <li>
//               <Link to="/IncomeTrack">Income Track</Link>
//             </li>
//             <li>
//               <Link to="/Summary">Summary</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Right sidebar */}
//         <div className="sidebar right-sidebar">
//           <h2></h2>
//           <ul>
//             <li>
//               <Link to="/Budget">Budget</Link>
//             </li>
//             <li>
//               <Link to="/dashboard/exptrack">ExpTrack</Link>
//             </li>
//             <li>
//               <Link to="/Income">Income</Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Conditional rendering of the Bar chart */}
//       {showChart && (
//         <div className="chart-container">
//           {/* Ensure proper styles for visibility */}
//           <Bar data={chartData} style={{ width: "400px", height: "300px" }} />
//         </div>
//       )}
//     </div>
//   )
// }

// export default DashSide
