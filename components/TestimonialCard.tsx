"use client"

import { motion, useReducedMotion } from "framer-motion"
import { StarIcon, QuoteIcon } from "lucide-react"
import { fadeInUp, hoverLift, reducedMotionFadeIn } from "@/lib/animations"

interface TestimonialCardProps {
  testimonial: {
    name: string
    role: string
    content: string
    rating: number
    image: string
  }
  index: number
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
      whileHover={shouldReduceMotion ? {} : hoverLift}
      className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Quote Icon */}
      <motion.div
        className="absolute top-4 right-4 text-purple-400/20 group-hover:text-purple-400/40 transition-colors duration-300"
        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
      >
        <QuoteIcon className="w-8 h-8" />
      </motion.div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
          >
            <StarIcon
              className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-slate-600"}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-300 mb-6 italic group-hover:text-slate-200 transition-colors duration-300">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center">
        <motion.img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50 mr-4"
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        />
        <div>
          <h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="text-slate-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}
