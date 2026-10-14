import * as React from "react"

export type Locale = "en" | "fr"

const dictionary = {
  en: {
    nav: { reachOut: "Reach out", language: "Language" },
    hero: {
      title: "Kernelium",
      description: "For your medical context",
      cta: "Reach out",
    },
    contact: {
      title: "Reach out",
      description: "Tell us about your context and we'll get back to you.",
      name: "Name",
      email: "Email",
      message: "Message",
      messagePlaceholder: "How can we help?",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Message sent",
      successDescription: "Thanks. We'll get back to you soon.",
      errorTitle: "Message not sent",
      errorDescription: "Something went wrong. Please try again.",
      activationDescription:
        "Confirm the activation email, then try again.",
    },
    footer: { rights: "All rights reserved." },
  },
  fr: {
    nav: { reachOut: "Nous joindre", language: "Langue" },
    hero: {
      title: "Kernelium",
      description: "Pour votre contexte médical",
      cta: "Nous joindre",
    },
    contact: {
      title: "Nous joindre",
      description:
        "Parlez-nous de votre contexte et nous vous répondrons rapidement.",
      name: "Nom",
      email: "Courriel",
      message: "Message",
      messagePlaceholder: "Comment pouvons-nous vous aider ?",
      submit: "Envoyer le message",
      sending: "Envoi…",
      successTitle: "Message envoyé",
      successDescription: "Merci. Nous vous répondrons bientôt.",
      errorTitle: "Message non envoyé",
      errorDescription: "Une erreur s'est produite. Veuillez réessayer.",
      activationDescription:
        "Confirmez le courriel d'activation, puis réessayez.",
    },
    footer: { rights: "Tous droits réservés." },
  },
} as const

export type Dictionary = (typeof dictionary)[Locale]

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

const STORAGE_KEY = "kernelium-locale"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en")

  // Restore the saved language (or the browser's) after hydration.
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved)
    } else if (navigator.language.toLowerCase().startsWith("fr")) {
      setLocaleState("fr")
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = React.useMemo(
    () => ({ locale, setLocale, t: dictionary[locale] }),
    [locale, setLocale]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = React.useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
