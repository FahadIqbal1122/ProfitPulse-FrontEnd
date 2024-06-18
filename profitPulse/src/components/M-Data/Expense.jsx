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
      {/* {submittedExpense && (
        <div>
          <h3>The added budget</h3>
          <p>note:{submittedExpense.note}</p>
          <p>amount:{submittedExpense.amount}</p>
        </div>
      )} */}
      <h3>Expense List</h3>
      {expenses.map((expense) => (
        <div key={expense._id}>
          <h4>name:{expense.name}</h4>
          <h4>amount:{expense.amount}</h4>
        </div>
      ))}
    </div>
  )
}
export default Expense
