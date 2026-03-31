import { Skeleton } from '../Skeleton'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import infoIcon from '../../assets/infoIcon.png'
import './styles.css'

export function AccommodationCard({ accommodation, accommodations, loading }) {
  const { t } = useTranslation()
  const [showTooltip, setShowTooltip] = useState(false)

  if (!accommodation) return null

  if (loading) {
    return <Skeleton />
  }

  const item = accommodations.find((a) => a.id === accommodation)

  return (
    <div className="cardAccommodation">
      <h3>{item.name}</h3>

      <p className="capacity">
        {t('capacity', { count: item.capacity })}

        <span
          className="tooltipIcon"
          onClick={() => setShowTooltip((prev) => !prev)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img src={infoIcon} alt="Info" className="tooltipIconImage" />
        </span>

        {showTooltip && (
          <span className="tooltipBox">{t('extraGuestInfo')}</span>
        )}
      </p>

      <p>{t('dailyRate', { rate: item.daily_rate })}</p>
    </div>
  )
}
