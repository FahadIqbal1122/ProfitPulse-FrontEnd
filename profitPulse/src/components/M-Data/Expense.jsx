import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Expense = ({ user }) => {
  const [formValues, setFormValues] = useState({
    note: '',
    amount: ''
  })
  const [submittedExpense, setSubmittedExpense] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [budgets, setBudgets] = useState([])

  const [editFormValues, setEditFormValues] = useState({
    note: '',
    amount: ''
  })

  let navigate = useNavigate()
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user.id) return
      const response = await axios.get(
        `http://localhost:3001/expense/${user.id}`
      )
      setExpenses(response.data)
    }
    const fetchBudgets = async () => {
      if (!user.id) return
      const response = await axios.get(
        `http://localhost:3001/budget/${user.id}`
      )
      setBudgets(response.data)
    }

    fetchExpenses()
    fetchBudgets()
  }, [user.id])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleEditChange = (e) => {
    setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      note: formValues.note,
      amount: formValues.amount,
      userId: user.id,
      budgetId: formValues.budgetId
    }

    const response = await axios.post('http://localhost:3001/expense/', data)

    const newExpense = response.data
    setExpenses([...expenses, newExpense])

    setFormValues({
      note: '',
      amount: ''
    })
    setSubmittedExpense({
      note: formValues.note,
      amount: formValues.amount
    })
    //navigate('/')
  }
  const handleUpdate = async (e) => {
    e.preventDefault()

    const response = await axios.put(
      `http://localhost:3001/expense/${editFormValues._id}`,
      editFormValues
    )

    const updatedExpense = response.data
    setExpenses((lastExpenses) =>
      lastExpenses.map((expense) => {
        if (expense._id === updatedExpense._id) {
          return updatedExpense
        } else {
          return expense
        }
      })
    )
    setEditFormValues({
      name: '',
      amount: ''
    })
  }
  const handleDelete = async (expenseId) => {
    await axios.delete(`http://localhost:3001/expense/${expenseId}`)
    setExpenses(expenses.filter((expense) => expense._id !== expenseId))
  }
  const handleEdit = (expense) => {
    setEditFormValues(expense)
  }
  return (
    <div className="Forms">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="note">Note</label>
            <input
              onChange={handleChange}
              name="note"
              type="text"
              value={formValues.note}
              required
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              onChange={handleChange}
              name="amount"
              type="number"
              value={formValues.amount}
              required
            />
          </div>
          <div>
            <label htmlFor="month">month</label>
            <select
              onChange={handleChange}
              name="month"
              value={formValues.month}
              required
            >
              <option value="" disabled>
                Select a month
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div>
            <label htmlFor="budget">Budget</label>
            {budgets ? (
              <select name="budgetId" onChange={handleChange}>
                <option value="">Select Budget</option>
                {budgets.map((budget) => (
                  <option key={budget._id} value={budget._id}>
                    {budget.name} - {budget.limit - budget.amount}
                  </option>
                ))}
              </select>
            ) : (
              <p>Loading budgets...</p>
            )}
          </div>
          <button disabled={!formValues.note || !formValues.amount}>
            Add expense
          </button>
        </form>
      </div>
      {editFormValues._id && (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="editNote">Note</label>
            <input
              onChange={handleEditChange}
              name="note"
              type="text"
              value={editFormValues.note}
              required
            />
          </div>
          <div>
            <label htmlFor="editAmount">Amount</label>
            <input
              onChange={handleEditChange}
              name="amount"
              type="number"
              value={editFormValues.amount}
              required
            />
          </div>
          <div>
            <label htmlFor="editMonth">month</label>
            <select
              onChange={handleEditChange}
              name="month"
              value={editFormValues.month}
              required
            >
              <option value="" disabled>
                Select a month
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <button>update</button>
        </form>
      )}
      <h3>Expense List</h3>
      {expenses.map((expense) => (
        <div key={expense._id}>
          <h4>note:{expense.note}</h4>
          <h4>amount:{expense.amount}</h4>
          <button onClick={() => handleDelete(expense._id)}>Delete</button>
          <button onClick={() => handleEdit(expense)}>Edit</button>
        </div>
      ))}
    </div>
  )
}
export default Expense
