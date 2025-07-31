"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { StarIcon, MapPinIcon, DollarSignIcon } from "lucide-react"
import { fadeInUp, hoverLift, reducedMotionFadeIn } from "@/lib/animations"

interface AthleteCardProps {
  athlete: {
    id: string
    name: string
    sport: string
    location: string
    price: string
    rating: number
    image: string
    description: string
  }
  index: number
}

export default function AthleteCard({ athlete, index }: AthleteCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
      whileHover={shouldReduceMotion ? {} : hoverLift}
      className="bg-slate-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg hover:border-purple-500/50 transition-all duration-300 group"
    >
      <Link href={`/athletes/${athlete.id}`} className="block">
        <div className="relative w-full h-48 overflow-hidden">
          <motion.img
            src={athlete.image}
            alt={athlete.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <motion.div
            className="absolute bottom-4 left-4 flex items-center bg-purple-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          >
            <StarIcon className="w-4 h-4 mr-1 fill-current text-yellow-300" />
            {athlete.rating.toFixed(1)}
          </motion.div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
            {athlete.name}
          </h3>
          <p className="text-purple-400 text-lg font-medium mb-3">{athlete.sport}</p>
          <div className="flex items-center text-slate-400 text-sm mb-2">
            <MapPinIcon className="w-4 h-4 mr-2" />
            {athlete.location}
          </div>
          <div className="flex items-center text-slate-400 text-sm mb-4">
            <DollarSignIcon className="w-4 h-4 mr-2" />
            {athlete.price}
          </div>
          <p className="text-slate-300 text-sm line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
            {athlete.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
