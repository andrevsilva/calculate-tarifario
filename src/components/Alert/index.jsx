import { useEffect, useState } from 'react'
import warningIcon from '../../assets/Warning.png'
import './styles.css'

export function Alert({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="container-alert">
      <img src={warningIcon} alt="Aviso" className="iconImage" />
      <span>{message}</span>
    </div>
  )
}
