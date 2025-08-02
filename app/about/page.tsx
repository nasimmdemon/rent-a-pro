"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { motion, useReducedMotion } from "framer-motion"
import { pageTransition, reducedMotionFadeIn, fadeInUp, staggerContainer, hoverLift } from "@/lib/animations"
import {
  LightbulbIcon,
  UsersIcon,
  HandshakeIcon,
  TrophyIcon,
  GlobeIcon,
  HeartIcon,
  TargetIcon,
  SparklesIcon,
  ShieldIcon,
  ZapIcon,
  StarIcon,
} from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const teamMembers = t("about.team.members")

  const values = [
    {
      icon: <HandshakeIcon className="w-10 h-10 text-pink-400" />,
      title: t("about.values.excellence.title"),
      description: t("about.values.excellence.description"),
    },
    {
      icon: <UsersIcon className="w-10 h-10 text-purple-400" />,
      title: t("about.values.community.title"),
      description: t("about.values.community.description"),
    },
    {
      icon: <LightbulbIcon className="w-10 h-10 text-yellow-400" />,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: <HeartIcon className="w-10 h-10 text-red-400" />,
      title: t("about.values.passion.title"),
      description: t("about.values.passion.description"),
    },
    {
      icon: <ShieldIcon className="w-10 h-10 text-green-400" />,
      title: t("about.values.trust.title"),
      description: t("about.values.trust.description"),
    },
    {
      icon: <ZapIcon className="w-10 h-10 text-blue-400" />,
      title: t("about.values.impact.title"),
      description: t("about.values.impact.description"),
    },
  ]

  const stats = [
    { number: "500+", label: t("about.stats.professionalAthletes"), icon: <TrophyIcon className="w-6 h-6" /> },
    { number: "50+", label: t("about.stats.countriesServed"), icon: <GlobeIcon className="w-6 h-6" /> },
    { number: "10K+", label: t("about.stats.trainingSessions"), icon: <TargetIcon className="w-6 h-6" /> },
    { number: "4.9", label: t("about.stats.averageRating"), icon: <StarIcon className="w-6 h-6" /> },
  ]

  const milestones = t("about.journey.milestones")

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
            <div className="flex justify-center mb-6">
              <SparklesIcon className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {t("about.title")}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              {t("about.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                whileHover={shouldReduceMotion ? {} : hoverLift}
                className="text-center group cursor-pointer"
              >
                <div className="flex justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-300 font-medium group-hover:text-purple-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.mission.title")}</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {t("about.mission.description1")}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {t("about.mission.description2")}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <TargetIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{t("about.mission.goal")}</h3>
                  <p className="text-slate-400">{t("about.mission.goalDescription")}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <LightbulbIcon className="w-32 h-32 text-purple-400/70" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.values.title")}</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                whileHover={shouldReduceMotion ? {} : hoverLift}
                className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group text-center"
              >
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.journey.title")}</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t("about.journey.subtitle")}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-pink-500" />

            <motion.div
              variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : hoverLift}
                      className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
                    >
                      <div className="text-2xl font-bold text-purple-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{milestone.title}</h3>
                      <p className="text-slate-300">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-slate-900" />
                  </div>

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.team.title")}</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t("about.team.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                whileHover={shouldReduceMotion ? {} : hoverLift}
                className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group text-center"
              >
                <motion.img
                  src="/placeholder.svg?height=200&width=200"
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple-500/50 group-hover:border-purple-400 transition-colors duration-300"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                />
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-purple-400 mb-3 font-medium">{member.role}</p>
                <p className="text-slate-300 text-sm mb-4 group-hover:text-slate-200 transition-colors duration-300">
                  {member.description}
                </p>
                <div className="space-y-1">
                  {member.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
                      {achievement}
                    </div>
                  ))}
                </div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("about.cta.title")}</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t("about.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/athletes"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                {t("about.cta.startTraining")}
              </motion.a>
              <motion.a
                href="/register-athlete"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="border-2 border-purple-500/50 text-purple-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                {t("about.cta.becomeTrainer")}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
