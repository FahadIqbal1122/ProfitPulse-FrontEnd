import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Budget = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    limit: ''
  })
  const [submittedBudget, setSubmittedBudget] = useState(null)
  const [budgets, setBudgets] = useState([])

  let navigate = useNavigate()
  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await axios.get('http://localhost:3001/budget/')
      setBudgets(response.data)
    }
    fetchBudgets()
  }, [])
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:3001/budget/', formValues)

    const newBudget = response.data
    setBudgets([...budgets, newBudget])

    setFormValues({
      name: '',
      limit: ''
    })
    setSubmittedBudget({
      name: formValues.name,
      limit: formValues.limit
    })
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
            <label htmlFor="limit">Limit</label>
            <input
              onChange={handleChange}
              name="limit"
              type="number"
              value={formValues.limit}
              required
            />
          </div>
          <button disabled={!formValues.name || !formValues.limit}>
            Add Budget
          </button>
        </form>
      </div>
      {/* {submittedBudget && (
        <div>
          <h3>The added budget</h3>
          <p>name:{submittedBudget.name}</p>
          <p>limit:{submittedBudget.limit}</p>
        </div>
      )} */}
      <h3>Income List</h3>
      {budgets.map((budget) => (
        <div key={budget._id}>
          <h4>name:{budget.name}</h4>
          <h4>amount:{budget.amount}</h4>
        </div>
      ))}
    </div>
  )
}
export default Budget
