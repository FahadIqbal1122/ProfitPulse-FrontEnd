import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const Expense = () => {
  const [formValues, setFormValues] = useState({
    note: "",
    amount: "",
  })
  const [submittedExpense, setSubmittedExpense] = useState(null)

  let navigate = useNavigate()
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.note]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post("http://localhost:3001/expense/", formValues)

    setFormValues({
      note: "",
      amount: "",
    })
    setSubmittedExpense({
      note: formValues.note,
      amount: formValues.amount,
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
      {submittedExpense && (
        <div>
          <h3>The added budget</h3>
          <p>note:{submittedExpense.note}</p>
          <p>amount:{submittedExpense.amount}</p>
        </div>
      )}
    </div>
  )
}
export default Expense
