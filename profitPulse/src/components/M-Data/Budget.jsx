import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Budget = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    limit: ''
  })
  let navigate = useNavigate()
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await createBudget({
      name: formValues.name,
      limit: formValues.limit
    })
    setFormValues({
      name: '',
      limit: ''
    })
    //navigate('/')
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
    </div>
  )
}
export default Budget
// let navigate = useNavigate()
// const [posts, setPosts] = useState([])

// useEffect(() => {
//   const handlePosts = async () => {
//     //const response = await fetch('http://data')
//     const data = await GetPosts()
//     setPosts(data)
//   }
//   handlePosts()
// }, [])
// return user ? (
//   <div>
//     {posts.map((post) => (
//       <div key={post.id}>
//         <h3>{post.name}</h3>
//         <p>{post.limit}</p>
//       </div>
//     ))}
//   </div>
// ) : (
//   <div>
//     <h3>Oops! You must be signed in to do that!</h3>
//     <button onClick={() => navigate('/signin')}>Sign In</button>
//   </div>
// )
