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
        const response = await axios.get(
          `http://localhost:3001/ai/${user.id}/money-saving-tips`
        )
        setTips(response.data.cohere.generated_text)
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
