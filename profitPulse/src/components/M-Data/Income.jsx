import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
// import axios from "axios"
import Client from "../../services/api"

const Income = ({ user }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    amount: "",
    month: "",
  })
  const [submittedIncome, setSubmittedIncome] = useState(null)
  const [incomes, setIncomes] = useState([])

  const [editFormValues, setEditFormValues] = useState({
    name: "",
    amount: "",
    month: "",
  })

  let navigate = useNavigate()
  useEffect(() => {
    const fetchIncomes = async () => {
      try{
      console.log(`user.id ${user.id}`)
       const response = await Client.get(`/income/${user.id}`)
      // const response = await axios.get(
      //   `https://profitpulse-backend.onrender.com/income/${user.id}`
      // )
      
      setIncomes(response.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchIncomes()
  }, [user.id])

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
       const response = await Client.post("/income", data)
    // const response = await axios.post("https://profitpulse-backend.onrender.com/income/", data)
    console.log(data)

    const newIncome = response.data
    setIncomes([...incomes, newIncome])

    setFormValues({
      name: "",
      amount: "",
      month: "",
    })
    setSubmittedIncome({
      name: formValues.name,
      amount: formValues.amount,
    })
  } catch(error) {
     console.log(error)
  }
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(editFormValues)
    try {
   
    const response = await Client.put(`/income/${editFormValues._id}`,
       {
        ...editFormValues,
        amount: Number(editFormValues.amount),
      }
    )
 

    // const response = await axios.put(
    //   `https://profitpulse-backend.onrender.com/income/${editFormValues._id}`,
    //   editFormValues
    // )
    console.log("UPDATED INCOME:", response.data)
    const updatedIncome = response.data
    setIncomes((lastIncomes) =>
      lastIncomes.map((income) => {
        if (income._id === updatedIncome._id ? updatedIncome
          : income ) {
          return updatedIncome
        } else {
          return income
        }
      })
    )
    setEditFormValues({
      name: "",
      amount: "",
      month: "",
    })
  } catch(error){
    console.log(error)
  }
  }
   const handleDelete = async (incomeId) => {
    try {
    await Client.delete(`/income/${incomeId}`)
  // const handleDelete = async (incomeId) => {
  //   await axios.delete(`https://profitpulse-backend.onrender.com/income/${incomeId}`)
    setIncomes(incomes.filter((income) => income._id !== incomeId))
} catch(error){
  console.log(error)
}
  }
  const handleEdit = async (income, incomeId) => {
    setEditFormValues(income)
  }
  return (
  <div className="Forms">
    {!editFormValues._id && (
      <>
        <h2 className="form-title">Add Income</h2>

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
              <label htmlFor="amount">Amount</label>
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
      </>
    )}

    {editFormValues._id && (
      <form onSubmit={handleUpdate} className="edit-form">
        <h2 className="form-title">Edit Income</h2>

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
          <label htmlFor="editAmount">Amount</label>
          <input
            onChange={handleEditChange}
            name="amount"
            type="number"
            value={editFormValues.amount}
            required
          />
        </div>

        <button type="submit">Update Income</button>
      </form>
    )}

    <h3>Income List</h3>

    {incomes.map((income) => (
      <div key={income._id}>
        <h4>name: {income.name}</h4>
        <h4>amount: {income.amount}</h4>

        <button type="button" onClick={() => handleDelete(income._id)}>
          Delete
        </button>

        <button type="button" onClick={() => handleEdit(income)}>
          Edit
        </button>
      </div>
    ))}
  </div>
)
}
export default Income
