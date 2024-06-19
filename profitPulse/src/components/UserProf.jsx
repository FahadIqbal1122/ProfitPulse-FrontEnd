import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const UserProf = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [updateError, setUpdateError] = useState("")

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setUpdateError("New passwords do not match")
      return
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/auth/update/${user.id}`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )

      if (response.data.status === "Password Updated!") {
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setUpdateError("")
      } else {
        setUpdateError(response.data.msg)
      }
    } catch (error) {
      console.error("Error updating password:", error)
      setUpdateError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <h3>User Info</h3>
          <ul className="list-group">
            <li className="list-group-item">Username: {user.username}</li>
            <li className="list-group-item">Email: {user.email}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Update Password</h3>
          <form onSubmit={handlePasswordUpdate}>
            <div className="form-group">
              <label htmlFor="oldPassword">Old Password:</label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span id="newPassword-error" className="text-danger">
                {updateError}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </form>
          {updateError && <p className="text-danger">{updateError}</p>}{" "}
        </div>
      </div>
    </div>
  )
}

export default UserProf
