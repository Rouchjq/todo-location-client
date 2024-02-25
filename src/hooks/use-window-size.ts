// main tools
import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: NaN,
    height: NaN,
    loading: true
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          loading: false
        })
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    loading: windowSize.loading,
    screenWidth: windowSize.width,
    screenHeight: windowSize.height
  }
}
