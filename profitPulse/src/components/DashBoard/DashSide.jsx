import React, { useState } from "react"
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

  const MonthlyExpenses = [
    { month: "January", amount: 1200 },
    { month: "February", amount: 1500 },
    { month: "March", amount: 1100 },
    { month: "April", amount: 1700 },
    { month: "May", amount: 1300 },
    { month: "June", amount: 1600 },
  ]

  const chartData = {
    labels: MonthlyExpenses.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Expenses",
        data: MonthlyExpenses.map((item) => item.amount),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  }

  // Extract category from the URL using useLocation
  const location = useLocation()
  const category = location.pathname.split("/")[1] // Assumes "/category"

  // Effect to show chart based on category
  React.useEffect(() => {
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
      <div className="content">
        <h1>Welcome to My App</h1>
        <p>This is the main content area.</p>
      </div>
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

        {/* Right sidebar */}
        <div className="sidebar right-sidebar">
          <h2></h2>
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

      {/* Conditional rendering of the Bar chart */}
      {showChart && (
        <div className="chart-container">
          {/* Ensure proper styles for visibility */}
          <Bar data={chartData} style={{ width: "400px", height: "300px" }} />
        </div>
      )}
    </div>
  )
}

export default DashSide
// import React from "react"
// import "../../App"
// import { Link, useNavigate } from "react-router-dom"

// const DashSide = () => {
//   let navigate = useNavigate()

//   const MonthlyExpenses = [
//     { month: "January", amount: 1200 },
//     { month: "February", amount: 1500 },
//     { month: "March", amount: 1100 },
//     { month: "April", amount: 1700 },
//     { month: "May", amount: 1300 },
//     { month: "June", amount: 1600 },
//   ]
//   const data = {
//     labels: MonthlyExpenses.map((item) => item.month),
//     //An array containing a single dataset object:
//     datasets: [
//       // Specifies the label for the dataset
//       {
//         label: "Monthly Expenses",
//         data: MonthlyExpenses.map((item) => item.amount),
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   }

//   return (
//     <div>
//       <div className="dashboard"></div>
//       <div className="content">
//         <h1>Welcome to My App</h1>
//         <p>This is the main content area.</p>
//       </div>
//       <div className="dash-container">
//         <div className="sidebar left-sidebar">
//           <h2>Categories</h2>
//           <ul>
//             <li>
//               <button onClick={() => navigate("/ExpTracker")}>
//                 ExpTracker
//               </button>
//             </li>
//             <li>
//               <a href="#incometrack">Income Track</a>
//             </li>
//             <li>
//               <a href="#summary">Summary</a>
//             </li>
//           </ul>
//         </div>

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
//     </div>
//   )
// }

// export default DashSide
