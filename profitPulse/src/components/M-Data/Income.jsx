import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Income = ({ user }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    amount: '',
    month: ''
  })
  const [submittedIncome, setSubmittedIncome] = useState(null)
  const [incomes, setIncomes] = useState([])

  const [editFormValues, setEditFormValues] = useState({
    name: '',
    amount: '',
    month: ''
  })

  let navigate = useNavigate()
  useEffect(() => {
    const fetchIncomes = async () => {
      console.log(`user.id ${user.id}`)
      const response = await axios.get(
        `http://localhost:3001/income/${user.id}`
      )
      setIncomes(response.data)
    }
    fetchIncomes()
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
      ...formValues,
      userId: user.id
    }

    const response = await axios.post('http://localhost:3001/income/', data)
    console.log(data)

    const newIncome = response.data
    setIncomes([...incomes, newIncome])

    setFormValues({
      name: '',
      amount: '',
      month: ''
    })
    setSubmittedIncome({
      name: formValues.name,
      amount: formValues.amount
    })
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(editFormValues)
    const response = await axios.put(
      `http://localhost:3001/income/${editFormValues._id}`,
      editFormValues
    )

    const updatedIncome = response.data
    setIncomes((lastIncomes) =>
      lastIncomes.map((income) => {
        if (income._id === updatedIncome._id) {
          return updatedIncome
        } else {
          return income
        }
      })
    )
    setEditFormValues({
      name: '',
      amount: '',
      month: ''
    })
  }
  const handleDelete = async (incomeId) => {
    await axios.delete(`http://localhost:3001/income/${incomeId}`)
    setIncomes(incomes.filter((income) => income._id !== incomeId))
  }
  const handleEdit = async (income, incomeId) => {
    setEditFormValues(income)
  }
  return (
    <div className="Forms">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={formValues.name}
              required
            />
          </div>
          <div>
            <label htmlFor="amount">amount</label>
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
            <input
              onChange={handleChange}
              name="month"
              type="text"
              value={formValues.month}
              required
            />
          </div>
          <button
            disabled={
              !formValues.name || !formValues.amount || !formValues.month
            }
          >
            Add your Income
          </button>
        </form>
      </div>
      {editFormValues._id && (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="editName">Name</label>
            <input
              onChange={handleEditChange}
              name="name"
              type="text"
              value={editFormValues.name}
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
            <input
              onChange={handleEditChange}
              name="month"
              type="text"
              value={editFormValues.month}
              required
            />
          </div>
          <button>Update Income</button>
        </form>
      )}
      <h3>Income List</h3>
      {incomes.map((income) => (
        <div key={income._id}>
          <h4>name:{income.name}</h4>
          <h4>amount:{income.amount}</h4>
          <h4>month:{income.month}</h4>
          <button onClick={() => handleDelete(income._id)}>Delete</button>
          <button onClick={() => handleEdit(income)}>Edit</button>
        </div>
      ))}
    </div>
  )
}
export default Income
