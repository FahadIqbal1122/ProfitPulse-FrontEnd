import React from "react"
import { Link } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav>
        <Link to="/data">Data</Link>
        <Link to="/dashboard">Dashboard</Link> |
        <Link to="/profile">Welcome {user.username}! </Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </nav>
  )

  return (
    <header className="navbar">
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          <img
            className="logo"
            src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
            alt="welcome banner"
          />
        </div>
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  )
}

export default Nav
