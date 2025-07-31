"use client"

import type React from "react"

import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, hoverLift, reducedMotionFadeIn } from "@/lib/animations"

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode
    title: string
    description: string
  }
  index: number
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
      whileHover={shouldReduceMotion ? {} : hoverLift}
      className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group"
    >
      <motion.div
        className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300"
        whileHover={shouldReduceMotion ? {} : { rotate: 5 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">{feature.description}</p>
    </motion.div>
  )
}
