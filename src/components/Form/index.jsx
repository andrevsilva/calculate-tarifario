import { useTranslation } from 'react-i18next'
import './styles.css'

export function Form({ form, setForm, onCalculate, accommodations, loading }) {
  const { t } = useTranslation()
  const isValid =
    form.accommodation && form.checkIn && form.checkOut && form.adults > 0

  function getToday() {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div>
      <div className="container">
        <h2>{t('title')}</h2>
        <select
          value={form.accommodation}
          onChange={(e) =>
            setForm({ ...form, accommodation: e.target.value, checkOut: '' })
          }
          className="select"
          disabled={loading}
        >
          <option value="" disabled>
            {loading ? 'Carregando...' : t('selectAccommodation')}
          </option>

          {!loading &&
            accommodations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>

        <input
          type="date"
          className="input"
          value={form.checkIn}
          min={getToday()}
          onChange={(e) =>
            setForm({
              ...form,
              checkIn: e.target.value,
              checkOut: ''
            })
          }
        />

        {form.checkIn && (
          <input
            type="date"
            className="input"
            value={form.checkOut}
            min={form.checkIn}
            onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
          />
        )}

        {form.checkOut && (
          <input
            type="number"
            min={1}
            placeholder="Adultos"
            className="input"
            value={form.adults}
            onChange={(e) =>
              setForm({ ...form, adults: Number(e.target.value) })
            }
          />
        )}

        <button onClick={onCalculate} disabled={!isValid} className="button">
          {t('calculate')}
        </button>
      </div>
    </div>
  )
}
