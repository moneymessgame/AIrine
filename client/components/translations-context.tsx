"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, getTranslation } from '@/lib/translations'
import { getAIrineData, formatString } from '@/lib/airine-data'

type TranslationValue = string | { [key: string]: TranslationValue }

type Translations = {
  [key: string]: TranslationValue
}

type TranslationsContextType = {
  t: (key: string, variables?: Record<string, string | number>) => string
  locale: string
  setLocale: (locale: string) => void
  airineData: ReturnType<typeof getAIrineData>
}

const TranslationsContext = createContext<TranslationsContextType | null>(null)

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')
  const [airineData, setAirineData] = useState(getAIrineData(locale));
  
  // Обновляем airineData при изменении локали
  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    setAirineData(getAIrineData(newLocale));
  }

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: TranslationValue = getTranslation(locale)
    
    for (const k of keys) {
      if (value === undefined) return key
      value = typeof value === 'object' ? value[k] : key
    }

    const result = typeof value === 'string' ? value : key
    
    // Если есть переменные для форматирования строки
    if (variables && typeof result === 'string') {
      return formatString(result, variables)
    }
    
    return result
  }

  return (
    <TranslationsContext.Provider value={{ t, locale, setLocale: handleLocaleChange, airineData }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationsContext)
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationsProvider')
  }
  return context
} 