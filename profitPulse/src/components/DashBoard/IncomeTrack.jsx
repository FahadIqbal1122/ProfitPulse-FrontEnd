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
import { Doughnut } from "react-chartjs-2"

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
      datasets: [{ label: "Incomes", data: [], backgroundColor: [] }],
    })
    console.log(`exp track details: ${JSON.stringify(details)}`)

    if (details.expenses) {
      const labels = details.incomes.map((item) => item.name)
      const data = details.incomes.map((item) => item.amount)
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
      <h2 style={{ textAlign: "center" }}>Incomes</h2>
      <Doughnut data={chartData} />
    </div>
  )
}

export default ExpTrack
