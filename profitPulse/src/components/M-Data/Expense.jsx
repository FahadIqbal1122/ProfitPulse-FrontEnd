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
// const Expense = (user) => {
//   let navigate = useNavigate()
//   const [posts, setPosts] = useState([])

//   useEffect(() => {
//     const handlePosts = async () => {
//       //const response = await fetch('http://data')
//       const data = await GetPosts()
//       setPosts(data)
//     }
//     handlePosts()
//   }, [])
//   return user ? (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.note}</h3>
//           <p>{post.amount}</p>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <div>
//       <h3>Oops! You must be signed in to do that!</h3>
//       <button onClick={() => navigate('/signin')}>Sign In</button>
//     </div>
//   )
// }
