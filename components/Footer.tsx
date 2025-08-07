"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { fadeInUp, staggerContainer, reducedMotionFadeIn } from "@/lib/animations"

export default function Footer() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const quickLinks = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.athletes"), href: "/athletes" },
    { name: t("navbar.howItWorks"), href: "/how-it-works" },
    { name: t("navbar.aboutUs"), href: "/about" },
  ]

  const supportLinks = [
    { name: t("footer.helpCenter"), href: "/help" },
    { name: t("footer.contactUs"), href: "/contact" },
    { name: t("footer.faq"), href: "/faq" },
  ]

  const legalLinks = [
    { name: t("footer.privacyPolicy"), href: "/privacy" },
    { name: t("footer.termsOfService"), href: "/terms" },
    { name: t("footer.cookiePolicy"), href: "/cookies" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, href: "#" },
    { name: "Twitter", icon: TwitterIcon, href: "#" },
    { name: "Instagram", icon: InstagramIcon, href: "#" },
    { name: "LinkedIn", icon: LinkedinIcon, href: "#" },
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Rent a Pro
              </span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">{t("footer.description")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-400 hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-slate-800/50"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
            <h3 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
            <h3 className="text-white font-semibold mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
            <h3 className="text-white font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Train a Pro. {t("footer.allRightsReserved")}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-slate-400 text-sm">Version: 1.1.8 By Studio Gelato GmbH ❤️</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
