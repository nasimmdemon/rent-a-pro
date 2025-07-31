"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { motion, useReducedMotion } from "framer-motion"
import { staggerContainer, fadeInUp, pageTransition, reducedMotionFadeIn, hoverLift } from "@/lib/animations"
import {
  SearchIcon,
  CalendarIcon,
  PlayIcon,
  UserCheckIcon,
  CreditCardIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  AwardIcon,
} from "lucide-react"

export default function HowItWorksPage() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      step: "01",
      title: "Browse & Discover",
      description: "Explore our diverse roster of elite athletes and coaches across various sports and specialties.",
      icon: <SearchIcon className="w-10 h-10" />,
      gradient: "from-blue-500 to-purple-500",
      details: [
        "Filter by sport, location, and price range",
        "Read detailed athlete profiles and reviews",
        "View availability and specializations",
        "Compare different coaching styles",
      ],
    },
    {
      step: "02",
      title: "Book Your Session",
      description: "Schedule a session that fits your needs and availability with instant confirmation.",
      icon: <CalendarIcon className="w-10 h-10" />,
      gradient: "from-purple-500 to-pink-500",
      details: [
        "Real-time availability calendar",
        "Flexible scheduling options",
        "Secure payment processing",
        "Instant booking confirmation",
      ],
    },
    {
      step: "03",
      title: "Train & Improve",
      description: "Achieve your goals with personalized guidance from world-class athletes.",
      icon: <PlayIcon className="w-10 h-10" />,
      gradient: "from-pink-500 to-red-500",
      details: [
        "One-on-one personalized training",
        "Goal-oriented session planning",
        "Progress tracking and feedback",
        "Continuous skill development",
      ],
    },
  ]

  const features = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Verified Athletes",
      description: "All our trainers are verified professional athletes with proven track records and credentials.",
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule with our easy-to-use calendar system.",
    },
    {
      icon: <CreditCardIcon className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing with multiple payment options available.",
    },
    {
      icon: <MessageSquareIcon className="w-8 h-8" />,
      title: "Direct Communication",
      description: "Chat directly with your trainer to discuss goals, preferences, and session details.",
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed progress reports and performance analytics.",
    },
    {
      icon: <AwardIcon className="w-8 h-8" />,
      title: "Achievement System",
      description: "Earn badges and achievements as you reach your fitness and skill milestones.",
    },
  ]

  const benefits = [
    {
      title: "For Athletes & Fitness Enthusiasts",
      items: [
        "Access to world-class professional athletes",
        "Personalized training programs",
        "Flexible scheduling options",
        "Progress tracking and analytics",
        "Community support and motivation",
      ],
    },
    {
      title: "For Professional Athletes & Trainers",
      items: [
        "Expand your coaching reach globally",
        "Set your own rates and schedule",
        "Build your personal brand",
        "Connect with motivated clients",
        "Secure payment processing",
      ],
    },
  ]

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-800/50 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              How Train a Pro Works
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Connect with elite athletes in three simple steps and transform your training experience
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <UserCheckIcon className="w-5 h-5 text-green-400" />
                <span>500+ Verified Athletes</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span>4.9 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon className="w-5 h-5 text-blue-400" />
                <span>10K+ Sessions Completed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Steps Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-24"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
              >
                {/* Step Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 5 }}
                      transition={{ duration: shouldReduceMotion ? 0.1 : 0.3 }}
                      className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer`}
                    >
                      {step.icon}
                    </motion.div>
                    <div className="text-6xl font-bold text-slate-800/20">{step.step}</div>
                  </div>

                  <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                  <p className="text-xl text-slate-300 leading-relaxed">{step.description}</p>

                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: shouldReduceMotion ? 0 : detailIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 text-slate-300"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${step.gradient} rounded-full`} />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Step Visual */}
                <div className="flex-1 flex justify-center">
                  <motion.div whileHover={shouldReduceMotion ? {} : hoverLift} className="relative">
                    <div className={`w-80 h-80 bg-gradient-to-br ${step.gradient} rounded-3xl opacity-20 blur-xl`} />
                    <div
                      className={`absolute inset-0 w-80 h-80 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center`}
                    >
                      <div className="text-white text-8xl opacity-30">{step.icon}</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Platform Features</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need for a seamless training experience
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                whileHover={shouldReduceMotion ? {} : hoverLift}
                className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Benefits for Everyone</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Whether you're looking to train or teach, Train a Pro has something for you
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                whileHover={shouldReduceMotion ? {} : hoverLift}
                className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{benefit.title}</h3>
                <ul className="space-y-4">
                  {benefit.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: shouldReduceMotion ? 0 : itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-slate-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who are already transforming their performance with Train a Pro
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/athletes"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                Find Your Coach
              </motion.a>
              <motion.a
                href="/register-athlete"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="border-2 border-purple-500/50 text-purple-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                Become a Trainer
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
