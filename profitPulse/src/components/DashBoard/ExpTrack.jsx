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
import { Pie } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

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
    console.log(`exp track details: ${JSON.stringify(details)}`)

    if (details && details.expenses && Array.isArray(details.expenses)) {
      const labels = details.expenses.map((item) => item.note)
      const data = details.expenses.map((item) => Number(item.amount))

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
    } else {
      setChartData({
        labels: [],
        datasets: [{ label: "Expenses", data: [], backgroundColor: [] }],
      })
    }
  }, [details])

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Expenses</h2>

      {details?.expenses?.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>No expenses yet</p>
      )}
    </div>
  )
}

export default ExpTrack
