import { GetPosts } from '../Auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Budget = (user) => {
  let navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const handlePosts = async () => {
      const data = await GetPosts()
      setPosts(data)
    }
    handlePosts()
  }, [])
  return (
    <div>
      {posts.map((post) => (
        <div>
          <p>{post.name}</p>
          <p>{post.limit}</p>
        </div>
      ))}
    </div>
  )
}
export default Budget
