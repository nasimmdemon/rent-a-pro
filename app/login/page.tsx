"use client"

import type React from "react"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { pageTransition, reducedMotionFadeIn, fadeInUp, staggerContainer } from "@/lib/animations"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Login attempt:", { email, password })
    setIsLoading(false)
    // Implement actual login logic here
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12 pt-24"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 text-white shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            >
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {t("login.title")}
              </CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                {t("login.description")}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.form
              onSubmit={handleSubmit}
              variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  {t("login.email")}
                </Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  {t("login.password")}
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("login.passwordPlaceholder")}
                    className="w-full pl-10 pr-12 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                    {t("login.rememberMe")}
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                  {t("login.forgotPassword")}
                </Link>
              </motion.div>

              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t("common.loading")}...
                    </div>
                  ) : (
                    t("login.signIn")
                  )}
                </Button>
              </motion.div>
            </motion.form>

            <motion.div
              variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
              className="text-center text-sm text-slate-400"
            >
              {t("login.noAccount")}{" "}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
                {t("login.registerNow")}
              </Link>
            </motion.div>


          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
