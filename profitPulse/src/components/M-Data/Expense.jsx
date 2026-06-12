import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
// import axios from "axios"
import Client from "../../services/api";

const Expense = ({ user }) => {
  const [formValues, setFormValues] = useState({
    note: "",
    amount: "",
     budgetId: "",
  })
  const [submittedExpense, setSubmittedExpense] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [budgets, setBudgets] = useState([])

  const [editFormValues, setEditFormValues] = useState({
    note: "",
    amount: "",
  })

  let navigate = useNavigate()
  useEffect(() => {
  const fetchExpenses = async () => {
    if (!user.id) return

    try {
      const response = await Client.get(`/expense/${user.id}`)
      setExpenses(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBudgets = async () => {
    if (!user.id) return

    try {
      const response = await Client.get(`/budget/${user.id}`)
      setBudgets(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  fetchExpenses()
  fetchBudgets()
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
      note: formValues.note,
      amount: Number(formValues.amount),
      userId: user.id,
      budgetId: formValues.budgetId,
    }

     console.log("EXPENSE DATA:", data)

     const response = await Client.post("/expense", data)

    // const response = await axios.post(
    //   "https://profitpulse-backend.onrender.com/expense/",
    //   data
    // )

    const newExpense = response.data
    console.log("NEW EXPENSE:", newExpense)
    setExpenses([...expenses, newExpense])

    setFormValues({
      note: "",
      amount: "",
      budgetId: "",
    })
    setSubmittedExpense({
      note: formValues.note,
      amount: formValues.amount,
    })
    //navigate('/')
  }
  const handleUpdate = async (e) => {
  e.preventDefault()

  console.log("UPDATE SUBMITTED:", editFormValues)
  console.log("UPDATING ID:", editFormValues._id)

  const response = await Client.put(
    `/expense/${editFormValues._id}`,
    {
      note: editFormValues.note,
      amount: Number(editFormValues.amount),
      budgetId: editFormValues.budgetId,
    }
  )

   
    // const response = await axios.put(
    //   `https://profitpulse-backend.onrender.com/expense/${editFormValues._id}`,
    //   editFormValues
    // )
   
    
    const updatedExpense = response.data

  setExpenses((lastExpenses) =>
    lastExpenses.map((expense) => {
      if (expense._id === updatedExpense._id) {
        return updatedExpense
      } else {
        return expense
      }
    })
  )

  setEditFormValues({
    note: "",
    amount: "",
    budgetId: "",
  })
}
    const handleDelete = async (expenseId) => {
   await Client.delete(`/expense/${expenseId}`)

  // const handleDelete = async (expenseId) => {
  //   await axios.delete(
  //     `https://profitpulse-backend.onrender.com/expense/${expenseId}`
  //   )
    setExpenses(expenses.filter((expense) => expense._id !== expenseId))
  }
const handleEdit = (expense) => {
  console.log("EDIT CLICKED:", expense)
  setEditFormValues(expense)

  const content = document.querySelector(".content")
  if (content) {
    content.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}
  return (
  <div className="Forms">
    {!editFormValues._id && (
      <>
        <h2 className="form-title">Add Expense</h2>

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

            <div>
              <label htmlFor="budget">Budget</label>
              <select
                name="budgetId"
                onChange={handleChange}
                value={formValues.budgetId}
                required
              >
                <option value="">Select Budget</option>
                {budgets.map((budget) => (
                  <option key={budget._id} value={budget._id}>
                    {budget.name} | Limit: {budget.limit} | Spent:{" "}
                    {budget.amount} | Remaining: {budget.limit - budget.amount}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={
                !formValues.note ||
                !formValues.amount ||
                !formValues.budgetId
              }
            >
              Add Expense
            </button>
          </form>
        </div>
      </>
    )}

    {editFormValues._id && (
      <form onSubmit={handleUpdate} className="edit-form">
        <h2 className="form-title">Edit Expense</h2>

        <div>
          <label htmlFor="editNote">Note</label>
          <input
            id="editNote"
            name="note"
            type="text"
            value={editFormValues.note}
            onChange={handleEditChange}
            required
          />
        </div>

        <div>
          <label htmlFor="editAmount">Amount</label>
          <input
            id="editAmount"
            name="amount"
            type="number"
            value={editFormValues.amount}
            onChange={handleEditChange}
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>
    )}

    <h3>Expense List</h3>

    {expenses.length > 0 &&
      expenses.map((expense) => (
        <div key={expense._id}>
          <h4>note: {expense.note}</h4>
          <h4>amount: {expense.amount}</h4>

          <button type="button" onClick={() => handleDelete(expense._id)}>
            Delete
          </button>

          <button type="button" onClick={() => handleEdit(expense)}>
            Edit
          </button>
        </div>
      ))}
  </div>
)

}
 
export default Expense
