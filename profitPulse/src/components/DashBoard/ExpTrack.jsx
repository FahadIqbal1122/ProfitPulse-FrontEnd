import React, { useState, useEffect } from "react"
import { GetExpense } from "../Auth"

const ExpTrack = () => {
  // state for holding data
  const [incomes, setIncome] = useState([])

  useEffect(() => {
    const GetExpenses = async () => {
      const data = await GetExpense()
      setIncome(data)
    }
    GetExpenses()
  }, [])
  return (
    <div className="Expense">
      {expenses.map((expense) => (
        <div className="Expensecard" key={expense.id}>
          <h3>{expense.note}</h3>
          <h3>{expense.amount}</h3>
          <h3>{expense.limit}</h3>
        </div>
      ))}
    </div>
  )
}
export default ExpTrack
