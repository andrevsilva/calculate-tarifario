import { useEffect, useState } from 'react'
import { getAccommodations } from '../services/accommodationService'

export function useAccommodations() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAccommodations()
        setData(result)
      } catch (err) {
        console.error(err)
        setError('errorFetchAccommodations')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
