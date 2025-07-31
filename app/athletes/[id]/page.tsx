"use client"

import { useParams } from 'next/navigation'
import { motion, useReducedMotion } from "framer-motion"
import { StarIcon, MapPinIcon, ClockIcon, CheckIcon, ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useAthlete } from "@/hooks/useAthlete"
import { useLanguage } from "@/contexts/LanguageContext"
import { pageTransition, reducedMotionFadeIn, fadeInUp } from "@/lib/animations"
import { getAthleteImageUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AthleteProfile() {
  const params = useParams()
  const { id } = params
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const { athlete, loading, error } = useAthlete(id as string)

  if (loading) {
    return (
      <motion.div
        variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen pt-20 bg-slate-900 flex items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
          <span className="text-slate-300">Loading athlete profile...</span>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen pt-20 bg-slate-900 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Error: {error}</div>
          <Link href="/athletes">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Back to Athletes
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  if (!athlete) {
    return (
      <motion.div
        variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen pt-20 bg-slate-900 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-slate-400 text-xl mb-4">Athlete not found</div>
          <Link href="/athletes">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Back to Athletes
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pt-20 bg-slate-900"
    >
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/athletes">
          <motion.button
            whileHover={shouldReduceMotion ? {} : { x: -5 }}
            className="flex items-center text-slate-400 hover:text-purple-400 transition-colors duration-200 mb-8"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Athletes
          </motion.button>
        </Link>
      </div>

      {/* Athlete Header */}
      <section className="py-12 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
            className="flex flex-col lg:flex-row items-start lg:items-center gap-8"
          >
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <motion.img
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                src={getAthleteImageUrl(athlete.profile_picture)}
                alt={athlete.full_name}
                className="w-48 h-48 rounded-3xl object-cover border-4 border-purple-500/50 shadow-2xl"
              />
            </div>

            {/* Athlete Info */}
            <div className="flex-grow">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
                className="text-4xl lg:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              >
                {athlete.full_name}
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
                className="text-2xl text-slate-300 mb-4 capitalize"
              >
                {athlete.sport_category} Coach • {athlete.experience_level} Level
              </motion.p>

              {/* Rating and Reviews */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
                className="flex items-center mb-4"
              >
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(parseFloat(athlete.rating))
                          ? "text-yellow-400 fill-current"
                          : "text-slate-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-slate-300 text-lg">
                    {athlete.rating}/5.0 ({athlete.total_reviews} reviews)
                  </span>
                </div>
              </motion.div>

              {/* Location and Rate */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
                className="flex flex-wrap items-center gap-6 mb-6"
              >
                <div className="flex items-center text-slate-300">
                  <MapPinIcon className="w-5 h-5 mr-2 text-purple-400" />
                  <span>{athlete.location}</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <ClockIcon className="w-5 h-5 mr-2 text-purple-400" />
                  <span className="text-2xl font-semibold text-purple-400">
                    ${athlete.hourly_rate}/hr
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3">
                  Book Training Session
                </Button>
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-lg px-8 py-3">
                  Contact Athlete
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Athlete Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Biography */}
              <motion.div
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">About</h3>
                    <p className="text-slate-300 leading-relaxed">{athlete.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Specializations */}
              {athlete.specializations && (
                <motion.div
                  variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Specializations</h3>
                      <div className="flex flex-wrap gap-3">
                        {athlete.specializations.split(',').map((spec, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30"
                          >
                            {spec.trim()}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Achievements */}
              {athlete.achievements && (
                <motion.div
                  variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Achievements</h3>
                      <p className="text-slate-300 leading-relaxed">{athlete.achievements}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Information */}
              <motion.div
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-purple-400">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Location:</span>
                        <span className="text-white">{athlete.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="text-white">{athlete.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="text-white">{athlete.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Experience:</span>
                        <span className="text-white capitalize">{athlete.experience_level}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Certifications */}
              {athlete.certifications && (
                <motion.div
                  variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Certifications</h3>
                      <p className="text-slate-300 leading-relaxed">{athlete.certifications}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Stats */}
              <motion.div
                variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-purple-400">Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Total Reviews:</span>
                        <span className="text-white font-semibold">{athlete.total_reviews}</span>
                      </div>
                      {athlete.total_bookings && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Total Bookings:</span>
                          <span className="text-white font-semibold">{athlete.total_bookings}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Rating:</span>
                        <span className="text-white font-semibold">{athlete.rating}/5.0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={`font-semibold capitalize ${
                          athlete.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {athlete.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
