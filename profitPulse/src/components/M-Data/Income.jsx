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
  const handleDelete = async (incomeId) => {
    await axios.delete(`http://localhost:3001/income/${incomeId}`)
    setIncomes(incomes.filter((income) => income._id !== incomeId))
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
      {/* {submittedIncome && (
        <div>
          <h3>The added budget</h3>
          <p>name:{submittedIncome.name}</p>
          <p>amount:{submittedIncome.amount}</p>
        </div>
      )} */}
      <h3>Income List</h3>
      {incomes.map((income) => (
        <div key={income._id}>
          <h4>name:{income.name}</h4>
          <h4>amount:{income.amount}</h4>
          <button onClick={() => handleDelete(income._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
export default Income
