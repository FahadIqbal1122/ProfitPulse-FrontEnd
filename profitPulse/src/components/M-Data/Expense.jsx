import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Expense = () => {
  const [formValues, setFormValues] = useState({
    note: '',
    amount: ''
  })
  const [submittedExpense, setSubmittedExpense] = useState(null)
  const [expenses, setExpenses] = useState([])

  const [editFormValues, setEditFormValues] = useState({
    note: '',
    amount: ''
  })

  let navigate = useNavigate()
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get('http://localhost:3001/expense/')
      setExpenses(response.data)
    }
    fetchExpenses()
  }, [])
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleEditChange = (e) => {
    setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await axios.post(
      'http://localhost:3001/expense/',
      formValues
    )

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
