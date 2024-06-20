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
    console.log(`exp track details: ${JSON.stringify(details)}`)
    const labels = details.incomes.map((item) => item.name)
    const data = details.incomes.map((item) => item.amount)
    const backgroundColor = ["#f44336", "#2196f3", "#ffc107"]

    setChartData({ labels, data, backgroundColor })
  }, [])

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  )
}

export default ExpTrack
