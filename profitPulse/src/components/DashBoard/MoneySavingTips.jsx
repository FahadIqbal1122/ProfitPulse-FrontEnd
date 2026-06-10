import React, { useState, useEffect } from "react"
// import axios from "axios"
import Client from "../../services/api"

const MoneySavingTips = ({ user }) => {
  const [tips, setTips] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (user.id) {
          console.log(user.id)
          const response = await Client.get(`/ai/${user.id}/money-saving-tips`)
          // const response = await axios.get(
          //   `https://profitpulse-backend.onrender.com/ai/${user.id}/money-saving-tips`
          // )
          console.log(`This is ai response: ${JSON.stringify(response.data)}`)
          console.log("AI TEXT:", response.data?.cohere?.generated_text)
         const cleanedTips = response.data.cohere.generated_text
  .replace(/\*\*/g, "")

       setTips(cleanedTips)
        } else {
          setError("User ID is not available. Please try again later.")
        }
      } catch (error) {
        console.error("Error fetching tips:", error)
        setError("Failed to fetch tips. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user.id])

  return (
  <div>
    {isLoading && <p>Loading...</p>}

    {error && <p className="error">{error}</p>}

   {tips && (
  <div className="tip-card">
    <pre
      style={{
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        fontFamily: "inherit",
        margin: 0
      }}
    >
      {tips}
    </pre>
  </div>
)}
  </div>
  
)
}


 

export default MoneySavingTips
