import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Client from "../../services/api"

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
    if (!user?.id) return;

    try {
      const response = await Client.get(`/budget/${user.id}`);
      setBudgets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  fetchBudgets();
}, [user]);
  // useEffect(() => {
  //   const fetchBudgets = async () => {
  //        const response = Client.get(`/budget/${user.id}`)
  //     // const response = await axios.get(
  //     //   `https://profitpulse-backend.onrender.com/budget/${user.id}`
  //     // )
  //     setBudgets(response.data)
  //   }
  //   fetchBudgets()
  // }, [])
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleEditChange = (e) => {
    setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const data = {
      ...formValues,
      userId: user.id,
    }

    const response = await Client.post("/budget", data)

    // console.log(data)

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
    const content = document.querySelector(".content")
if (content) content.scrollTop = 0

  } catch (error) {
    console.log(error)
  }
}

  const handleUpdate = async (e) => {
    e.preventDefault()
         
       try {

      const response = await Client.put(
  `/budget/${editFormValues._id}`,
  editFormValues
)
    // const response = await axios.put(
    //   `https://profitpulse-backend.onrender.com/budget/${editFormValues._id}`,
    //   editFormValues
    // )

    const updatedBudget = response.data

    if (!updatedBudget || !updatedBudget._id) {
  console.error("No updated budget returned:", response.data)
  return
}

    setBudgets((lastBudgets) =>
      lastBudgets.map((budget) => {
        if (budget._id === updatedBudget._id) {
          return updatedBudget
        } else {
          return budget
        }
      })
    )
  setEditFormValues({})
  } catch(error) {
      console.log(error)
  }
  }
   const handleDelete = async (budgetId) => {
     try {
    await Client.delete(`/budget/${budgetId}`)
  // const handleDelete = async (budgetId) => {
  //   await axios.delete(
  //     `https://profitpulse-backend.onrender.com/budget/${budgetId}`
  //   )
    // setBudgets(Budget.filter((budget) => budget._id !== budgetId))
    setBudgets(
  budgets.filter((budget) => budget._id !== budgetId)
)
} catch(error) {
  console.log(error)
}
  }
  const handleEdit = (budget) => {
    setEditFormValues(budget)

    const content = document.querySelector(".content")
  if (content) content.scrollTop = 0
  }

  useEffect(() => {
  const content = document.querySelector(".content")
  if (content) {
    content.scrollTop = 0
  }
}, [])

  return (
  <div className="Forms">
    {!editFormValues._id && (
      <>
        <h2 className="form-title">Add Budget</h2>

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
      </>
    )}

    {editFormValues._id && (
      <form onSubmit={handleUpdate} className="edit-form">
        <h2 className="form-title">Edit Budget</h2>

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
          <label htmlFor="editLimit">limit</label>
          <input
            onChange={handleEditChange}
            name="limit"
            value={editFormValues.limit}
            type="number"
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>
    )}

    <h3>budget List</h3>

    {budgets?.length > 0 &&
      budgets
        ?.filter((budget) => budget)
        .map((budget) => (
          <div key={budget._id}>
            <h4>name: {budget.name}</h4>
            <h4>limit: {budget.limit}</h4>

            <button onClick={() => handleDelete(budget._id)}>
              Delete
            </button>

            <button onClick={() => handleEdit(budget)}>
              Edit
            </button>
          </div>
        ))}
      </div>
  )
}
      
 
export default Budget
