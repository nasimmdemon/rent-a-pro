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


          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
