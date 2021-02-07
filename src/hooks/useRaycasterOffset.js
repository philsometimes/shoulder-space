import { useState, useEffect } from 'react'
import layout from '../views/tandemLayout'

export default function useRaycasterOffset(camId) {
  const [offsets, setOffsets] = useState({
                                                x: window.innerWidth * layout[camId].x,
                                                y: window.innerHeight * layout[camId].y,
                                              })
  const handleResize = () => {
    setOffsets({
      x: window.innerWidth * layout[camId].x,
      y: window.innerHeight * layout[camId].y,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])
  return offsets
}
