import React, { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)
import { Pie } from "react-chartjs-2"

const ExpTrack = ({ details }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expenses",
        data: [],
        backgroundColor: [],
      },
    ],
  })

  useEffect(() => {
    setChartData({
      labels: [],
      datasets: [{ label: "Expenses", data: [], backgroundColor: [] }],
    })
    console.log(`exp track details: ${JSON.stringify(details)}`)

    if (details.expenses) {
      const labels = details.expenses.map((item) => item.note)
      const data = details.expenses.map((item) => item.amount)
      const backgroundColor = details.expenses.map((_, index) => {
        const colors = ["#f44336", "#2196f3", "#ffc107", "#9c27b0", "#4caf50"]
        return colors[index % colors.length]
      })

      setChartData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data,
            backgroundColor,
          },
        ],
      })
    }
  }, [details])

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Expenses</h2>
      {details.budgets && details.expenses ? (
        <Pie data={chartData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default ExpTrack
