import { useEffect } from 'react'
import axios from 'axios'

const useKeepAlive = () => {
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    
    // Ping the server every 10 minutes (600,000 ms)
    const keepAliveInterval = setInterval(async () => {
      try {
        await axios.get(`${apiUrl}/health`, { timeout: 5000 })
        console.log('✅ Keep-alive ping sent')
      } catch (error) {
        console.error('❌ Keep-alive ping failed:', error.message)
      }
    }, 10 * 60 * 1000) // 10 minutes
    
    // Clean up interval on unmount
    return () => clearInterval(keepAliveInterval)
  }, [])
}

export default useKeepAlive
