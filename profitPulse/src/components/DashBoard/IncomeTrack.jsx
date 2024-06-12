import React, { useState, useEffect } from "react"
import { GetPosts } from "../Auth"

const IncomeTrack = () => {
  // state for holding data
  const [incomes, setIncome] = useState([])

  useEffect(() => {
    const GetIncome = async () => {
      const data = await GetIncome()
      setIncome(data)
    }
    GetIncome()
  }, [])
  return (
    <div className="Income">
      {incomes.map((income) => (
        <div className="Incomecard" key={income.id}>
          <h3>{income.title}</h3>
          <h3>{income.amount}</h3>
        </div>
      ))}
    </div>
  )
}
export default IncomeTrack
