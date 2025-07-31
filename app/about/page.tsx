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

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description:
        "Former Olympic swimmer turned entrepreneur, passionate about democratizing access to elite sports training.",
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Olympic Gold Medalist", "Sports Tech Innovator", "Forbes 30 Under 30"],
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Athlete Relations",
      description: "Ex-professional basketball player with 15+ years of coaching experience across multiple sports.",
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["NBA Veteran", "Certified Coach", "Youth Development Expert"],
    },
    {
      name: "Emily Chen",
      role: "Chief Technology Officer",
      description:
        "Tech visionary with expertise in AI and machine learning, revolutionizing sports training technology.",
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["MIT Graduate", "AI Specialist", "Tech Innovation Award"],
    },
    {
      name: "David Thompson",
      role: "Head of Operations",
      description: "Operations expert ensuring seamless experiences for athletes and trainers on our platform.",
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Operations Excellence", "Process Optimization", "Team Leadership"],
    },
  ]

  const values = [
    {
      icon: <HandshakeIcon className="w-10 h-10 text-pink-400" />,
      title: "Excellence",
      description:
        "We strive for the highest standards in coaching and platform experience, ensuring every interaction exceeds expectations.",
    },
    {
      icon: <UsersIcon className="w-10 h-10 text-purple-400" />,
      title: "Community",
      description:
        "Fostering a supportive and inspiring network where athletes and coaches can learn, grow, and achieve together.",
    },
    {
      icon: <LightbulbIcon className="w-10 h-10 text-yellow-400" />,
      title: "Innovation",
      description:
        "Continuously evolving with cutting-edge technology and innovative training methods to stay ahead of the curve.",
    },
    {
      icon: <HeartIcon className="w-10 h-10 text-red-400" />,
      title: "Passion",
      description: "Driven by genuine love for sports and helping others achieve their athletic dreams and potential.",
    },
    {
      icon: <ShieldIcon className="w-10 h-10 text-green-400" />,
      title: "Trust",
      description:
        "Building lasting relationships through transparency, reliability, and consistent delivery of promises.",
    },
    {
      icon: <ZapIcon className="w-10 h-10 text-blue-400" />,
      title: "Impact",
      description: "Creating meaningful change in the lives of athletes and the broader sports community worldwide.",
    },
  ]

  const stats = [
    { number: "500+", label: "Professional Athletes", icon: <TrophyIcon className="w-6 h-6" /> },
    { number: "50+", label: "Countries Served", icon: <GlobeIcon className="w-6 h-6" /> },
    { number: "10K+", label: "Training Sessions", icon: <TargetIcon className="w-6 h-6" /> },
    { number: "4.9", label: "Average Rating", icon: <StarIcon className="w-6 h-6" /> },
  ]

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Train a Pro was founded with a vision to connect athletes with world-class trainers globally.",
    },
    {
      year: "2021",
      title: "First 100 Athletes",
      description: "Reached our first milestone of 100 verified professional athletes on the platform.",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to 25+ countries, making elite training accessible to athletes worldwide.",
    },
    {
      year: "2023",
      title: "10K Sessions",
      description: "Celebrated 10,000 successful training sessions and launched advanced analytics features.",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Introduced AI-powered matching and personalized training recommendations.",
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
            <div className="flex justify-center mb-6">
              <SparklesIcon className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              About Train a Pro
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              We're on a mission to democratize access to world-class sports training, connecting passionate athletes
              with elite professionals who can help them reach their full potential.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                We believe every athlete deserves access to world-class training, regardless of their location or
                background. Our platform breaks down geographical barriers and makes elite coaching accessible to anyone
                with the passion to improve.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                By connecting aspiring athletes with professional trainers, we're creating opportunities for growth,
                learning, and excellence in sports while building a global community of passionate individuals.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <TargetIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Our Goal</h3>
                  <p className="text-slate-400">Empower 1 million athletes by 2030</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our culture
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From a simple idea to a global platform transforming sports training
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The passionate individuals behind Train a Pro, dedicated to your success
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
                  src={member.image}
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Be part of the revolution in sports training. Whether you're an athlete or trainer, there's a place for
              you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/athletes"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                Start Training
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
