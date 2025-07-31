"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { Loader2Icon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function RedirectPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const redirectTo = searchParams.get("to") || "/"
    const delay = Number.parseInt(searchParams.get("delay") || "2000", 10)

    const timer = setTimeout(() => {
      router.push(redirectTo)
    }, delay)

    return () => clearTimeout(timer)
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white px-4 text-center pt-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
      >
        <Loader2Icon className="w-24 h-24 text-purple-400 mx-auto mb-6 animate-spin" />
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t("redirect.title")}
        </h1>
        <p className="text-lg text-slate-400 mb-10">{t("redirect.description")}</p>
      </motion.div>
    </div>
  )
}
