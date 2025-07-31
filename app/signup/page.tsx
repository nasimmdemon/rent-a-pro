"use client"

import type React from "react"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { pageTransition, reducedMotionFadeIn, fadeInUp, staggerContainer } from "@/lib/animations"

export default function SignupPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Signup attempt:", formData)
    setIsLoading(false)
    // Implement actual signup logic here
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
              <CardTitle className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {t("signup.title")}
              </CardTitle>
              <CardDescription className="text-slate-300 mt-2 text-sm sm:text-base">
                {t("signup.description")}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Signup Type Selection */}
            <motion.div
              variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 gap-3 mb-6"
            >
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="w-full bg-purple-500/20 border-purple-500 text-purple-400 hover:bg-purple-500/30 text-xs sm:text-sm py-2 sm:py-3"
                >
                  {t("signup.userSignup")}
                </Button>
              </Link>
              <Link href="/register-athlete">
                <Button
                  variant="outline"
                  className="w-full bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs sm:text-sm py-2 sm:py-3"
                >
                  {t("signup.trainerSignup")}
                </Button>
              </Link>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-200 text-sm">
                    {t("signup.firstName")}
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-200 text-sm">
                    {t("signup.lastName")}
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 text-sm">
                  {t("signup.email")}
                </Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="space-y-2">
                <Label htmlFor="password" className="text-slate-200 text-sm">
                  {t("signup.password")}
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200 text-sm">
                  {t("signup.confirmPassword")}
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                className="flex items-start space-x-2"
              >
                <input
                  id="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-600 rounded bg-slate-700 mt-0.5"
                  required
                />
                <label htmlFor="agreeTerms" className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t("signup.agreeTerms")}
                </label>
              </motion.div>

              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    t("signup.createAccount")
                  )}
                </Button>
              </motion.div>
            </motion.form>

            <motion.div
              variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
              className="text-center text-xs sm:text-sm text-slate-400"
            >
              {t("signup.alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                {t("signup.signInNow")}
              </Link>
            </motion.div>

            <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">Or continue with</span>
              </div>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
              className="grid grid-cols-2 gap-3"
            >
              <Button
                variant="outline"
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-purple-500 transition-colors text-xs sm:text-sm py-2 sm:py-3"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-purple-500 transition-colors text-xs sm:text-sm py-2 sm:py-3"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
