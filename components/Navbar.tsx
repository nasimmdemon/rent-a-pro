"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { MenuIcon, XIcon, GlobeIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  fadeInUp,
  reducedMotionFadeIn,
  mobileMenuOverlay,
  mobileMenuPanel,
  mobileMenuItems,
  fastStaggerContainer,
} from "@/lib/animations"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, changeLanguage, language } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const navLinks = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.athletes"), href: "/athletes" },
    { name: t("navbar.howItWorks"), href: "/how-it-works" },
    { name: t("navbar.aboutUs"), href: "/about" },
    { name: t("navbar.login"), href: "/login" },
    { name: t("navbar.signup"), href: "/signup" },
    { name: t("navbar.becomeTrainer"), href: "/register-athlete" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleLanguageChange = () => {
    changeLanguage(language === "en" ? "de" : "en")
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <motion.nav
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800/50 py-3 sm:py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
              className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            >
              Rent a Pro
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-300 font-medium relative group text-sm xl:text-base"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={handleLanguageChange}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-300 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-slate-800/50 flex items-center space-x-2"
              aria-label={t("navbar.changeLanguage")}
            >
              <GlobeIcon className="w-4 h-4 xl:w-5 xl:h-5" />
              <span className="text-xs font-medium">{language.toUpperCase()}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-300 hover:text-purple-400 focus:outline-none p-2 rounded-lg hover:bg-slate-800/50"
              aria-label="Toggle menu"
            >
              {isOpen ? <XIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : mobileMenuOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={closeMenu} />

            {/* Menu Panel */}
            <motion.div
              variants={shouldReduceMotion ? reducedMotionFadeIn : mobileMenuPanel}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative h-full w-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 px-4"
            >
              {/* Close Button */}
              <motion.button
                onClick={closeMenu}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-300 hover:text-purple-400 p-2 rounded-lg hover:bg-slate-800/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.button>

              {/* Language Switcher */}
              <motion.button
                onClick={handleLanguageChange}
                className="absolute top-4 left-4 sm:top-6 sm:left-6 text-slate-300 hover:text-purple-400 p-2 rounded-lg hover:bg-slate-800/50 flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlobeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm font-medium">{language.toUpperCase()}</span>
              </motion.button>

              {/* Menu Items */}
              <motion.div
                variants={shouldReduceMotion ? reducedMotionFadeIn : fastStaggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-xs w-full"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    variants={shouldReduceMotion ? reducedMotionFadeIn : mobileMenuItems}
                    custom={index}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="text-xl sm:text-2xl font-semibold text-slate-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300 text-center block py-2 px-4 rounded-lg hover:bg-slate-800/30 w-full"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-xl" />
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-pink-500/10 rounded-full blur-xl" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
