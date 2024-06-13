import React, { useState, useEffect } from "react"
import { GetExpenses, GetIncome } from "../Auth"

const Summary = () => {
  // state for holding expenses and income data
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])

  // state for holding expense and income summary
  // initialized with totalAmount and averageAmount set to 0
  const [expenseSummary, setExpenseSummary] = useState({
    totalAmount: 0,
    averageAmount: 0,
  })
  const [incomeSummary, setIncomeSummary] = useState({
    totalAmount: 0,
    averageAmount: 0,
  })

  // function to fetch income data and calculate income summary
  const fetchIncomeData = async () => {
    try {
      const incomeData = await GetIncome()
      setIncomes(incomeData)
      // calculate income summary
      const totalAmount = incomeData.reduce(
        (total, income) => total + income.amount,
        0
      )
      const averageAmount = totalAmount / incomeData.length
      setIncomeSummary({ totalAmount, averageAmount })
    } catch (error) {
      console.error("Error fetching incomes:", error)
    }
  }

  // function to fetch expense data and calculate expense summary
  const fetchExpenseData = async () => {
    try {
      const expenseData = await GetExpenses()
      setExpenses(expenseData)
      // calculate expense summary
      const totalAmount = expenseData.reduce(
        (total, expense) => total + expense.amount,
        0
      )
      const averageAmount = totalAmount / expenseData.length
      setExpenseSummary({ totalAmount, averageAmount })
    } catch (error) {
      console.error("Error fetching expenses:", error)
    }
  }

  useEffect(() => {
    fetchIncomeData()
    fetchExpenseData()
  }, [])

  return (
    <div className="Summary">
      <h2>Expense Summary</h2>
      <div>Total Expenses: ${expenseSummary.totalAmount}</div>
      <div>Average Expense: ${expenseSummary.averageAmount.toFixed(2)}</div>
      {expenses.map((expense) => (
        <div className="Expensecard" key={expense.id}>
          <h3>{expense.note}</h3>
          <h3>{expense.amount}</h3>
        </div>
      ))}
      <h2>Income Summary</h2>
      <div>Total Income: ${incomeSummary.totalAmount}</div>
      <div>Average Income: ${incomeSummary.averageAmount.toFixed(2)}</div>
      {incomes.map((income) => (
        <div className="Incomecard" key={income.id}>
          <h3>{income.title}</h3>
          <h3>{income.amount}</h3>
        </div>
      ))}
    </div>
  )
}

export default Summary
