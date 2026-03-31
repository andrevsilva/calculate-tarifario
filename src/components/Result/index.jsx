import { useTranslation } from 'react-i18next'
import { Alert } from '../Alert'
import { useState } from 'react'
import './styles.css'

export function Result({ result }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  if (result.error) {
    return <Alert message={t(result.error, { count: result.count })} />
  }

  return (
    <>
      <div className="resultCard">
        <h3>{t('total')}</h3>
        <p className="totalValue">R$ {result.data.total.toFixed(2)}</p>

        <button className="detailsButton" onClick={() => setOpen(true)}>
          {t('seeDetails')}
        </button>
      </div>

      {open && (
        <div className="modalOverlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{t('details')}</h3>

            <p>
              {t('nights')}: {result.data.nights}
            </p>
            <p>
              {t('daily')}: R$ {result.data.totalDaily.toFixed(2)}
            </p>
            <p>
              {t('cleaning')}: R$ {result.data.cleaningFee}
            </p>
            {result.data.extraGuestFee > 0 && (
              <p>
                {t('extra')}: R$ {result.data.extraGuestFee.toFixed(2)}
              </p>
            )}
            {result.data.weekendExtra > 0 && (
              <p className="warning">
                {t('weekendExtra')}: + R$ {result.data.weekendExtra.toFixed(2)}
              </p>
            )}

            {result.data.discount > 0 && (
              <p className="success">
                {t('discount')}: - R$ {result.data.discount.toFixed(2)}
              </p>
            )}

            <hr />

            <p className="totalFinal">
              {t('total')}: R$ {result.data.total.toFixed(2)}
            </p>

            <button onClick={() => setOpen(false)}>{t('close')}</button>
          </div>
        </div>
      )}
    </>
  )
}
