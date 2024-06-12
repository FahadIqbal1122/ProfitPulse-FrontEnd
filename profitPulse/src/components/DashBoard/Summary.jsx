import React, { useState, useEffect } from "react"
import { GetExpenses, GetIncome } from "../Auth"

const Summmary = () => {
  // state for holding expenses and income data
  const [expenses, setExpenses] = useState([])
  const [income, setIncomes] = useState([])

  // state for holding expense and income summary and
  // also setting current state  obj to total amount and average and intialized '0'
  const [expenseSummary, SetExpenseSummary] = useState({
    totalAmount: 0,
    averageAmount: 0,
  })
  const [incomeSummary, setIncomeSummary] = useState({
    totalAmount: 0,
    averageAmount: 0,
  })

  const fetchIncomeData = async () => {
    try {
      const incomedata = await GetIncome()
      setIncomes(incomedata)
      // calculate income summary
      const totalAmount = incomedata.reduce(
        (total, income) => total + income.amount,
        0
      )
      const averageAmount = totalAmount / incomedata.length
      setIncomeSummary((totalAmount, averageAmount))
    } catch (error) {
      console.error("Error fetching incomes:", error)
    }
  }
  const fetchExpensesData = async () => {
    try {
      // waiting for getexpense
      const data = await GetExpenses()
      setExpenses(data)
      // calculate summary
      const totalAmount = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      )
      const averageAmount = expenses.reduce(
        (total, average) => total + average,
        0
      )
      setSummary({ totalAmount, averageAmount })
    } catch (error) {
      console.error("Error fetching expenses:", error)
    }
  }

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const expensedata = await GetExpenses()
        setExpenses(expensedata)
        // calculate expense summary
        const totalAmount = expensedata.reduce(
          (total, expense) => total + expense.amount,
          0
        )
        const averageAmount = totalAmount / expensedata.length
        SetExpenseSummary({ totalAmount, averageAmount })
      } catch (error) {
        console.error("Error fetching expenses:", error)
      }
    }
    fetchIncomeData()
    fetchExpensesData()
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
export default Summmary
