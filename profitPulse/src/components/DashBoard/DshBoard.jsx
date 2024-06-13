// credits from Zippy
import React from "react"
import { Bar } from "react-chartjs-2"
import "../../App"
import { Link } from "react-router-dom"

const DshBoard = () => {
  const MonthlyExpenses = [
    { month: "January", amount: 1200 },
    { month: "February", amount: 1500 },
    { month: "March", amount: 1100 },
    { month: "April", amount: 1700 },
    { month: "May", amount: 1300 },
    { month: "June", amount: 1600 },
  ]
  const data = {
    labels: MonthlyExpenses.map((item) => item.month),
    //An array containing a single dataset object:
    datasets: [
      // Specifies the label for the dataset
      {
        label: "Monthly Expenses",
        data: MonthlyExpenses.map((item) => item.amount),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  }
  return (
    <Router>
      <div className="dashboard">
        <div className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/exptrack">ExpTrack</Link>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </div>

        <div className="main-content">
          <Switch>
            <Route exact path="/dashboard">
              <h2>Welcome to Dashboard</h2>
              {/* Add main dashboard content here */}
            </Route>
            <Route path="/dashboard/exptrack">
              <h2>Expense Tracker</h2>
              <div className="chart-container">
                <Bar data={data} />
              </div>
            </Route>
            <Route path="*">
              <h2>404 - Page Not Found</h2>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default DshBoard
