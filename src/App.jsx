import { useState } from 'react'
import { Header } from './components/Header'
import { Form } from './components/Form'
import { Result } from './components/Result'
import { AccommodationCard } from './components/AccommodationCard'
import { calculateTarifario } from './utils/pricing/calculateTarifario'
import { useAccommodations } from './hooks/useAccommodations'
import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { data: accommodations, loading, error } = useAccommodations()
  const { t } = useTranslation()

  function handleCalculate() {
    const res = calculateTarifario(form, accommodations)
    setResult(res)
  }

  const [form, setForm] = useState({
    accommodation: '',
    checkIn: '',
    checkOut: '',
    adults: 1
  })

  const [result, setResult] = useState(null)

  console.log('resultado', result)

  function handleFormChange(updatedForm) {
    setForm(updatedForm)
    setResult(null)
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="card">
          <Form
            form={form}
            accommodations={accommodations}
            loading={loading}
            setForm={handleFormChange}
            onCalculate={handleCalculate}
          />
          {error && <Alert message={t(error)} />}

          <AccommodationCard
            accommodation={form.accommodation}
            accommodations={accommodations}
            loading={loading}
          />

          {result && <Result result={result.data} />}
        </div>
      </div>
    </>
  )
}

export default App
