import { GetPosts } from '../Auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Budget = (user) => {
  let navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const handlePosts = async () => {
      //const response = await fetch('http://data')
      const data = await GetPosts()
      setPosts(data)
    }
    handlePosts()
  }, [])
  return user ? (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.limit}</p>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}
export default Budget
