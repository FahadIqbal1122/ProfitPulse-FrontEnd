// src/App.jsx
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import { CheckSession } from "./services/Auth"
import Nav from "./components/Nav"
import SignUp from "./components/Auth/SignUp"
import LogIn from "./components/Auth/Login"
import DashSide from "./components/DashBoard/DashSide"

import "./App.css"

const App = () => {
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

          {/* Route for ExpTracker component */}
          <Route path="/*" element={<DashSide />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
