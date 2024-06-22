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
import DataSide from "./components/M-Data/DataSide"

const App = () => {
  const [user, setUser] = useState({})

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
          {/* <Route path="/Budget" element={<Budget user={user} />} />
          <Route path="/Expense" element={<Expense user={user} />} />
          <Route path="/Income" element={<Income user={user} />} /> */}
          <Route path="/*" element={<DashSide user={user} />} />
          <Route path="/profile" element={<UserProf user={user} />} />
          <Route path="/data" element={<DataSide user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
