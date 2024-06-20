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

const ExpTrack = ({ user, details }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expenses",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  })

  useEffect(() => {
    const expenseData = [
      { category: "Food", amount: 200 },
      { category: "Transportation", amount: 100 },
      { category: "Entertainment", amount: 50 },
    ]
    console.log(`exp track details: ${details.expenses}`)
    const labels = expenseData.map((item) => item.category)
    const data = expenseData.map((item) => item.amount)
    const backgroundColor = ["#f44336", "#2196f3", "#ffc107"]

    setChartData({ labels, data, backgroundColor })
  }, [])

  return (
    <div>
      <Pie data={chartData} />
    </div>
  )
}

export default ExpTrack
