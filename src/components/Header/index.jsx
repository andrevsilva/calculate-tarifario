import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/logo.svg'
import globeLanguage from '../../assets/globe-language.svg'
import './styles.css'

export function Header() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const currentLang = i18n.language

  function changeLanguage(lang) {
    i18n.changeLanguage(lang)
    setOpen(false)
  }

  return (
    <>
      <header className="header">
        <div className="logoContainer">
          <img src={logo} alt="Hospedin" className="logoImg" />
        </div>

        <button className="langButton" onClick={() => setOpen(true)}>
          <img src={globeLanguage} alt="Idioma" className="iconImage" />
        </button>
      </header>

      {open && (
        <div className="modalOverlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{t('selectLanguage')}</h3>

            <div className="flags">
              <button
                className={currentLang === 'pt' ? 'active' : ''}
                onClick={() => changeLanguage('pt')}
              >
                🇧🇷 Português
              </button>

              <button
                className={currentLang === 'en' ? 'active' : ''}
                onClick={() => changeLanguage('en')}
              >
                🇺🇸 English
              </button>

              <button
                className={currentLang === 'es' ? 'active' : ''}
                onClick={() => changeLanguage('es')}
              >
                🇪🇸 Español
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
