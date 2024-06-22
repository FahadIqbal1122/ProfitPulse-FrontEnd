import React, { useState, useEffect } from "react"
import axios from "axios"

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
          const response = await axios.get(
            `https://profitpulse-backend.onrender.com/ai/${user.id}/money-saving-tips`,
            {
              headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
              },
            }
          )
          console.log(`This is ai response: ${JSON.stringify(response.data)}`)
          setTips(response.data.cohere.generated_text)
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
      {tips && <p>{tips}</p>}
    </div>
  )
}

export default MoneySavingTips
