"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import {
  PlayIcon,
  UsersIcon,
  VideoIcon,
  CalendarIcon,
  MicIcon as MicrophoneIcon,
  SearchIcon,
  ChevronDownIcon,
  MapPinIcon,
  ArrowRightIcon,
  ZapIcon,
  HeartIcon,
  ShieldIcon,
  SparklesIcon,
  TrophyIcon,
  StarIcon,
} from "lucide-react"
import TestimonialCard from "@/components/TestimonialCard"
import FeatureCard from "@/components/FeatureCard"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  hoverLift,
  tapScale,
  smoothTransition,
  reducedMotionFadeIn,
  pageTransition,
  heroTextReveal,
  heroTextStagger,
  floatingAnimation,
  pulseAnimation,
} from "@/lib/animations"

export default function HomePage() {
  const { t } = useLanguage()
  const [filterLocation, setFilterLocation] = useState("")
  const [filterService, setFilterService] = useState("")
  const [filterPrice, setFilterPrice] = useState("")
  const shouldReduceMotion = useReducedMotion()

  const features = [
    {
      icon: <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: t("home.personalTraining"),
      description: t("home.personalTrainingDesc"),
    },
    {
      icon: <VideoIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: t("home.webinars"),
      description: t("home.webinarsDesc"),
    },
    {
      icon: <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: t("home.events"),
      description: t("home.eventsDesc"),
    },
    {
      icon: <MicrophoneIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: t("home.workshops"),
      description: t("home.workshopsDesc"),
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tennis Player",
      content: "Training with Marcus improved my serve by 40% in just 3 months. Incredible experience!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mike Chen",
      role: "Basketball Coach",
      content: "The webinars are fantastic. I've learned techniques I never knew existed.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emma Rodriguez",
      role: "Fitness Enthusiast",
      content: "Amazing platform! The athletes are professional and really care about your progress.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { number: "500+", label: t("home.activeTrainers"), icon: <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { number: "10K+", label: t("home.sessionsCompleted"), icon: <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { number: "25+", label: t("home.countriesServed"), icon: <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { number: "4.9", label: t("home.avgRating"), icon: <StarIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  ]

  const benefits = [
    {
      icon: <ZapIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: t("home.instantBooking"),
      description: t("home.instantBookingDesc"),
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <ShieldIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: t("home.verifiedAthletes"),
      description: t("home.verifiedAthletesDesc"),
      gradient: "from-green-400 to-blue-500",
    },
    {
      icon: <HeartIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: t("home.personalizedExperience"),
      description: t("home.personalizedExperienceDesc"),
      gradient: "from-pink-400 to-purple-500",
    },
  ]

  // Split text into words for animation
  const heroTitle = t("home.heroTitle")
  const titleWords = heroTitle.split(" ")

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.05%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{
                background: "linear-gradient(90deg, #ffffff, #a855f7, #ec4899, #ffffff)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("home.heroTitle")}
            </motion.h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-slate-200">{t("home.heroSubtitle")}</h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">{t("home.heroDescription")}</p>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div variants={fadeInUp}>
                <Link href="/athletes">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                  >
                    {t("home.findCoach")}
                  </motion.button>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/register-athlete">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300"
                  >
                    {t("home.becomeTrainer")}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDownIcon className="w-8 h-8 text-purple-400" />
        </motion.div>
      </section>

      {/* Quick Filter Section */}
      <section className="py-12 sm:py-20 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("home.filterTitle")}</h2>
            <p className="text-lg sm:text-xl text-slate-300">{t("home.filterDescription")}</p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-slate-800/60 backdrop-blur-xl p-4 sm:p-8 rounded-3xl border border-slate-700/50 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {[
                {
                  label: t("home.location"),
                  placeholder: t("home.locationPlaceholder"),
                  value: filterLocation,
                  setValue: setFilterLocation,
                  icon: <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
                },
                {
                  label: t("home.serviceType"),
                  placeholder: t("home.allServices"),
                  value: filterService,
                  setValue: setFilterService,
                  isSelect: true,
                  options: [
                    t("home.allServices"),
                    t("home.personalTraining"),
                    t("home.workshops"),
                    t("home.webinars"),
                    t("home.events"),
                  ],
                },
                {
                  label: t("home.priceRange"),
                  placeholder: t("home.anyPrice"),
                  value: filterPrice,
                  setValue: setFilterPrice,
                  isSelect: true,
                  options: [t("home.anyPrice"), "$50 - $100", "$100 - $200", "$200+"],
                },
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.1,
                    duration: shouldReduceMotion ? 0.1 : 0.4,
                  }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2 text-slate-300">{field.label}</label>
                  <div className="relative">
                    {field.icon && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                        {field.icon}
                      </div>
                    )}
                    {field.isSelect ? (
                      <select
                        value={field.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        className="w-full px-4 py-3 sm:py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 appearance-none backdrop-blur-sm text-white text-sm sm:text-base"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option} className="bg-slate-800">
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        className={`w-full ${field.icon ? "pl-8 sm:pl-10" : "pl-4"} pr-4 py-3 sm:py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-slate-400 text-sm sm:text-base`}
                      />
                    )}
                    {field.isSelect && (
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <Link href="/athletes">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : tapScale}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-base"
              >
                <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t("home.searchAthletes")}</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">{t("home.statsTitle")}</h2>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeIn}
                whileHover={shouldReduceMotion ? {} : hoverLift}
                className="text-center group cursor-pointer"
              >
                <div className="flex justify-center mb-2 sm:mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <motion.div
                  className="text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-1 sm:mb-2"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={smoothTransition}
                >
                  {stat.number}
                </motion.div>
                <div className="text-slate-300 font-medium group-hover:text-purple-300 transition-colors duration-300 text-xs sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">{t("home.featuresTitle")}</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">{t("home.featuresDescription")}</p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">{t("home.whyChooseTitle")}</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">{t("home.whyChooseDescription")}</p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeIn}
                whileHover={shouldReduceMotion ? {} : hoverLift}
                className="bg-slate-800/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 group relative overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <motion.div
                  className="text-purple-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={shouldReduceMotion ? {} : { rotate: 5 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 text-sm sm:text-base">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">{t("home.howItWorksTitle")}</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">{t("home.howItWorksDescription")}</p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
          >
            {[
              {
                step: "01",
                title: t("home.browse"),
                description: t("home.browseDesc"),
                icon: <SearchIcon className="w-8 h-8 sm:w-10 sm:h-10" />,
                gradient: "from-blue-500 to-purple-500",
              },
              {
                step: "02",
                title: t("home.book"),
                description: t("home.bookDesc"),
                icon: <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10" />,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: t("home.train"),
                description: t("home.trainDesc"),
                icon: <PlayIcon className="w-8 h-8 sm:w-10 sm:h-10" />,
                gradient: "from-pink-500 to-red-500",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeIn}
                className="relative text-center group"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 5 }}
                  transition={smoothTransition}
                  className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r ${step.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white shadow-2xl group-hover:shadow-purple-500/25 cursor-pointer`}
                >
                  {step.icon}
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-6xl sm:text-8xl font-bold text-slate-800/30 group-hover:text-slate-700/50 transition-colors duration-300"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-300 max-w-sm mx-auto group-hover:text-slate-200 transition-colors duration-300 text-sm sm:text-base">
                  {step.description}
                </p>
                {index < 2 && !shouldReduceMotion && (
                  <motion.div
                    className="hidden md:block absolute top-8 sm:top-12 -right-16 sm:-right-20 w-32 sm:w-40 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">{t("home.testimonialsTitle")}</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">{t("home.testimonialsDescription")}</p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">{t("home.ctaTitle")}</h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t("home.ctaDescription")}
            </p>
            <Link href="/athletes">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : tapScale}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-500 inline-flex items-center space-x-2 sm:space-x-3 relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{t("home.startTraining")}</span>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  transition={smoothTransition}
                  className="relative z-10"
                >
                  <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
