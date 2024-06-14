import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const DashSide = () => {
  const [showChart, setShowChart] = useState(false) // Initialize to false
  // Expense data
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
    { month: "November", amount: 1200 },
    { month: "December", amount: 1900 },
  ]

  // Define a color palette
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

  const borderColors = colors.map((color) => color.replace("0.6", "1"))

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

  // Extract category from the URL using useLocation
  const location = useLocation()
  const category = location.pathname.split("/")[1] // Assumes "/category"

  useEffect(() => {
    if (category === "ExpTracker") {
      setShowChart(true)
    } else {
      setShowChart(false)
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
          {category === "ExpTracker" && (
            <>
              <h1>Welcome to My ExpTracker</h1>
              <p>
                ExpTracker visualizes your monthly expenses, helping you track
                spending habits, identify trends, and manage your budget
                effectively. The bar chart below highlights your expenses,
                showing fluctuations and potential savings areas. Use this tool
                to achieve your financial goals.
              </p>
              {showChart && (
                <div className="chart-container">
                  <Bar
                    data={chartData}
                    style={{ width: "400px", height: "300px" }}
                  />
                </div>
              )}
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
