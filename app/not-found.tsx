"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { FrownIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function NotFoundPage() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white px-4 text-center pt-20">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
      >
        <FrownIcon className="w-24 h-24 text-purple-400 mx-auto mb-6" />
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-slate-300 mb-6">{t("notFound.title")}</p>
        <p className="text-lg text-slate-400 mb-10">{t("notFound.description")}</p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            {t("notFound.goHome")}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
