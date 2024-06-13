import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Income = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    amount: ''
  })
  let navigate = useNavigate()
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await createIncome({
      name: formValues.name,
      amount: formValues.amount
    })
    setFormValues({
      name: '',
      amount: ''
    })
    //navigate('/signin')
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}></form>
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
    </div>
  )
}
export default Income
