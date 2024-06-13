import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Budget = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    limit: ''
  })
  const [submittedBudget, setSubmittedBudget] = useState(null)

  let navigate = useNavigate()
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:3001/budget/', formValues)

    setFormValues({
      name: '',
      limit: ''
    })
    setSubmittedBudget({
      name: formValues.name,
      limit: formValues.limit
    })
    //navigate('/')
  }
  return (
    <div>
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
      {submittedBudget && (
        <div>
          <h3>The added budget</h3>
          <p>name:{submittedBudget.name}</p>
          <p>limit:{submittedBudget.limit}</p>
        </div>
      )}
    </div>
  )
}
export default Budget
