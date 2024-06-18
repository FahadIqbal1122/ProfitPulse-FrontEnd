import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Income = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    amount: ''
  })
  const [submittedIncome, setSubmittedIncome] = useState(null)
  const [incomes, setIncomes] = useState([])

  const [editFormValues, setEditFormValues] = useState({
    name: '',
    amount: ''
  })

  let navigate = useNavigate()
  useEffect(() => {
    const fetchIncomes = async () => {
      const response = await axios.get('http://localhost:3001/income/')
      setIncomes(response.data)
    }
    fetchIncomes()
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
      'http://localhost:3001/income/',
      formValues
    )
    const newIncome = response.data
    setIncomes([...incomes, newIncome])

    setFormValues({
      name: '',
      amount: ''
    })
    setSubmittedIncome({
      name: formValues.name,
      amount: formValues.amount
    })
  }
  const handleUpdate = async (e) => {
    e.preventDefault()

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
      _id: '',
      name: '',
      amount: ''
    })
  }
  const handleDelete = async (incomeId) => {
    await axios.delete(`http://localhost:3001/income/${incomeId}`)
    setIncomes(incomes.filter((income) => income._id !== incomeId))
  }
  const handleEdit = (income) => {
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
          <button disabled={!formValues.name || !formValues.amount}>
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
          <button>Update Income</button>
        </form>
      )}
      <h3>Income List</h3>
      {incomes.map((income) => (
        <div key={income._id}>
          <h4>name:{income.name}</h4>
          <h4>amount:{income.amount}</h4>
          <button onClick={() => handleDelete(income._id)}>Delete</button>
          <button onClick={() => handleEdit(income)}>Edit</button>
        </div>
      ))}
    </div>
  )
}
export default Income
