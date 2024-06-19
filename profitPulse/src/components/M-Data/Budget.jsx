import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Budget = ({ user }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    limit: "",
  })
  const [submittedBudget, setSubmittedBudget] = useState(null)
  const [budgets, setBudgets] = useState([])

  const [editFormValues, setEditFormValues] = useState({
    name: "",
    limit: "",
  })

  let navigate = useNavigate()
  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await axios.get(
        `http://localhost:3001/budget/${user.id}`
      )
      setBudgets(response.data)
    }
    fetchBudgets()
  }, [])
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
      userId: user.id,
    }

    const response = await axios.post("http://localhost:3001/budget/", data)

    console.log(data)

    const newBudget = response.data
    setBudgets([...budgets, newBudget])

    setFormValues({
      name: "",
      limit: "",
    })
    setSubmittedBudget({
      name: formValues.name,
      limit: formValues.limit,
    })
  }
  const handleUpdate = async (e) => {
    e.preventDefault()

    const response = await axios.put(
      `http://localhost:3001/budget/${editFormValues._id}`,
      editFormValues
    )

    const updatedBudget = response.data
    setBudgets((lastBudgets) =>
      lastBudgets.map((budget) => {
        if (budget._id === updatedBudget._id) {
          return updatedBudget
        } else {
          return budget
        }
      })
    )
    setEditFormValues({
      name: "",
      limit: "",
    })
  }
  const handleDelete = async (budgetId) => {
    await axios.delete(`http://localhost:3001/budget/${budgetId}`)
    setBudgets(budgets.filter((budget) => budget._id !== budgetId))
  }
  const handleEdit = (budget) => {
    setEditFormValues(budget)
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
            <label htmlFor="editLimit">amount</label>
            <input
              onChange={handleEditChange}
              name="limit"
              value={editFormValues.limit}
              type="number"
              required
            />
          </div>
          <button>Update </button>
        </form>
      )}
      <h3>budget List</h3>
      {budgets.length > 0 &&
        budgets.map((budget) => (
          <div key={budget._id}>
            <h4>name:{budget.name}</h4>
            <h4>limit:{budget.limit}</h4>
            <button onClick={() => handleDelete(budget._id)}>Delete</button>
            <button onClick={() => handleEdit(budget)}>Edit</button>
          </div>
        ))}
    </div>
  )
}
export default Budget
