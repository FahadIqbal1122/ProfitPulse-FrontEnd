import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./App.jsx"
import { UserProvider } from "./components/Context/UserContext.jsx"
createRoot(document.querySelector("#root")).render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
)
