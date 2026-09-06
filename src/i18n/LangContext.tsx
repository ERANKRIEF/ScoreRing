import { createContext, useContext, useState, useEffect } from 'react'
import type { Lang, Translations } from './translations'
import { TRANSLATIONS } from './translations'
import type { Level } from '../types'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
  td: (penId: string, level?: Level) => string
}

const defaultCtx: LangCtx = {
  lang: 'en',
  setLang: () => {},
  t: TRANSLATIONS.en,
  td: (penId) => TRANSLATIONS.en.penDescs[penId] as string ?? '',
}

const Ctx = createContext<LangCtx>(defaultCtx)

function detectLang(): Lang {
  const stored = localStorage.getItem('app-lang') as Lang | null
  if (stored && stored in TRANSLATIONS) return stored
  const browser = navigator.language?.slice(0, 2)
  if (browser === 'fr') return 'fr'
  if (browser === 'he' || browser === 'iw') return 'he'
  return 'en'
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const t = TRANSLATIONS[lang]

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('app-lang', l)
  }

  // resolve a (possibly level-dependent) penalty description
  function td(penId: string, level?: Level): string {
    const d = t.penDescs[penId]
    if (!d) return ''
    if (typeof d === 'function') return d(level ?? 1)
    return d
  }

  useEffect(() => {
    document.documentElement.dir  = t.dir
    document.documentElement.lang = lang
  }, [lang, t.dir])

  return (
    <Ctx.Provider value={{ lang, setLang, t, td }}>
      {children}
    </Ctx.Provider>
  )
}

export const useLang = () => useContext(Ctx)
