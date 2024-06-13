import { LogInUser } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Expense = () => {
  const [formValues, setFormValues] = useState({
    note: '',
    amount: ''
  })

  let navigate = useNavigate()
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.note]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createExpense({
      note: formValues.note,
      amount: formValues.amount
    })
    setFormValues({
      note: '',
      amount: ''
    })
    //navigate('/')
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}></form>
      </div>
      <div>
        <label htmlFor="note">Note</label>
        <input
          onChange={handleChange}
          name="note"
          type="text"
          placeholder="your note"
          value={formValues.note}
          required
        />
      </div>
      <div>
        <input
          onChange={handleChange}
          name="amount"
          type="number"
          placeholder="The amount"
          value={formValues.amount}
          required
        />
      </div>
      <button disabled={!formValues.note || !formValues.amount}>Add</button>
    </div>
  )
}
export default Expense
