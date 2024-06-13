import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
const Income = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    amount: "",
  })
  const [submittedIncome, setSubmittedIncome] = useState(null)

  let navigate = useNavigate()
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post("http://localhost:3001/income/", formValues)

    setFormValues({
      name: "",
      amount: "",
    })
    setSubmittedIncome({
      name: formValues.name,
      amount: formValues.amount,
    })
    //navigate('/')
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
      {submittedIncome && (
        <div>
          <h3>The added budget</h3>
          <p>name:{submittedIncome.name}</p>
          <p>amount:{submittedIncome.amount}</p>
        </div>
      )}
    </div>
  )
}
export default Income
