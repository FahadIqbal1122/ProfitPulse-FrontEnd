import ExpTrack from "./components/DashBoard"
import IncomeTrack from "./components/DashBoard"

import "./App.css"
import Summary from "./components/DashBoard/Summary"

const App = () => {
  return (
    <div>
      <IncomeTrack />
      <ExpTrack />
      <Summary />
    </div>
  )
}

export default App
