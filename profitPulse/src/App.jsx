import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Route, Routes } from "react-router"
import { CheckSession } from "./services/Auth"
import Nav from "./components/Nav"
import SignUp from "./components/Auth/SignUp"
import LogIn from "./components/Auth/Login"
import Budget from "./components/M-Data/Budget"
import Expense from "./components/M-Data/Expense"
import Income from "./components/M-Data/Income"
import DashSide from "./components/DashBoard/DashSide"
import UserProf from "./components/UserProf"
import "./App.css"
import axios from "axios"
import UserContext from "./components/Context/UserContext"

const App = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ai/${userId}`)
        console.log(response.data)
        setUserData(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [userId])

  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    // Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/login" element={<LogIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/Budget" element={<Budget />} />
          <Route path="/Expense" element={<Expense />} />
          <Route path="/Income" element={<Income />} />
          <Route path="/*" element={<DashSide />} />
          <Route path="/profile" element={<UserProf />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
