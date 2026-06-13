// import Axios from "axios"

// // export const BASE_URL = "https://profitpulse-backend.onrender.com/"
// export const BASE_URL = "http://localhost:3001"
// // Create a custom axios instance
// const Client = Axios.create({ baseURL: BASE_URL })
// // Intercepts every request axios makes
// Client.interceptors.request.use(
//   (config) => {
//     // Reads the token in localStorage
//     const token = localStorage.getItem("token")
//     // if the token exists, we set the authorization header
//     if (token) {
//       config.headers["authorization"] = `Bearer ${token}`
//     }
//     return config // We return the new config if the token exists or the default config if no token exists.
//     // Provides the token to each request that passes through axios
//   },
//   (error) => Promise.reject(error)
// )

// export default Client

import axios from "axios"

// Base URL
// Local development → http://localhost:3001
// Production (Vercel) → value from VITE_API_URL
export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001"

// Create a custom axios instance
const Client = axios.create({
  baseURL: BASE_URL,
})

// Runs before every request
// Checks if a JWT token exists in localStorage
// If found, attaches it to the Authorization header
Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    // Attach JWT token for protected routes
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }

    return config
  },

  // Handle request errors
  (error) => Promise.reject(error)
)

// Export axios instance for use throughout the app
export default Client