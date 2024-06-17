import { createContext, useState, useEffect } from "react"
const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(user)
        } else {
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserContext
