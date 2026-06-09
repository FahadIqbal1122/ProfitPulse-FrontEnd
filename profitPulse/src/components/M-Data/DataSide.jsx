import React, { useState, useRef } from "react"
import Budget from "./Budget"
import Expense from "./Expense"
import Income from "./Income"

const DataSide = ({ user }) => {
  const [leftSidebarMinimized, setLeftSidebarMinimized] = useState(false)
  const [activeComponent, setActiveComponent] = useState("budget")
  const contentRef = useRef(null)

  const toggleSidebar = () => {
    setLeftSidebarMinimized(!leftSidebarMinimized)
  }

  const handleComponentToggle = (component) => {
    setActiveComponent(component)

    setTimeout(() => {
      contentRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 0)
  }

  return (
    <div>
      <div className="dashboard"></div>
      <div className="dash-container">
        <div
          className={`sidebar left-sidebar ${
            leftSidebarMinimized ? "minimized" : ""
          }`}
        >
          <button className="toggle-btn" onClick={toggleSidebar}>
            {leftSidebarMinimized ? ">" : "<"}
          </button>

          <h2>Add Data</h2>

          <ul>
            <li>
              <button onClick={() => handleComponentToggle("budget")} className="data-side-button">
                Add Budget
              </button>
            </li>
            <li>
              <button onClick={() => handleComponentToggle("expense")} className="data-side-button">
                Add Expense
              </button>
            </li>
            <li>
              <button onClick={() => handleComponentToggle("income")} className="data-side-button">
                Add Income
              </button>
            </li>
          </ul>
        </div>

        <div className="content" ref={contentRef}>
          {activeComponent === "budget" && (
            <div className="chart-container">
              <Budget user={user} />
            </div>
          )}

          {activeComponent === "expense" && (
            <div className="chart-container">
              <Expense user={user} />
            </div>
          )}

          {activeComponent === "income" && (
            <div className="chart-container">
              <Income user={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataSide