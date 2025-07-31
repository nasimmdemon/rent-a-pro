"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { CalendarIcon, ClockIcon, MessageSquareIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/LanguageContext"
import { fadeIn, fadeInUp } from "@/lib/animations"

interface Athlete {
  id: string
  name: string
  sport: string
  location: string
  price: string
  rating: number
  image: string
  description: string
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const router = useRouter()
  const { id } = params
  const shouldReduceMotion = useReducedMotion()

  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [message, setMessage] = useState("")
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error">("idle")

  // Mock data for athletes (replace with actual data fetching)
  const mockAthletes: Athlete[] = [
    {
      id: "1",
      name: "Marcus Rashford",
      sport: "Football",
      location: "Manchester, UK",
      price: "$150/hr",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
      description: "Experienced football coach specializing in attacking play and youth development.",
    },
    {
      id: "2",
      name: "Serena Williams",
      sport: "Tennis",
      location: "Florida, USA",
      price: "$200/hr",
      rating: 5.0,
      image: "/placeholder.svg?height=200&width=200",
      description: "Legendary tennis player offering advanced coaching for competitive athletes.",
    },
    {
      id: "3",
      name: "LeBron James",
      sport: "Basketball",
      location: "Los Angeles, USA",
      price: "$250/hr",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
      description: "NBA superstar providing elite basketball training and mentorship.",
    },
  ]

  useEffect(() => {
    const foundAthlete = mockAthletes.find((a) => a.id === id)
    if (foundAthlete) {
      setAthlete(foundAthlete)
    } else {
      // Handle athlete not found, e.g., redirect to 404 or athletes list
      router.push("/not-found")
    }
  }, [id, router])

  const handleBooking = async () => {
    // Simulate API call
    try {
      // In a real app, you'd send this data to your backend
      console.log("Booking details:", {
        athleteId: athlete?.id,
        date: selectedDate,
        time: selectedTime,
        message,
      })
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay
      setBookingStatus("success")
    } catch (error) {
      console.error("Booking failed:", error)
      setBookingStatus("error")
    }
  }

  if (!athlete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white pt-20">
        {t("booking.loadingAthlete")}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
        className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8 space-y-8"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t("booking.title")}
        </h1>

        <div className="flex flex-col items-center text-center">
          <img
            src={athlete.image || "/placeholder.svg"}
            alt={athlete.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 mb-4"
          />
          <h2 className="text-2xl font-semibold">{t("booking.athleteName").replace("{name}", athlete.name)}</h2>
          <p className="text-slate-400">
            {athlete.sport} - {athlete.location}
          </p>
        </div>

        {bookingStatus === "idle" && (
          <div className="space-y-6">
            <motion.div variants={shouldReduceMotion ? fadeIn : fadeInUp}>
              <Label htmlFor="date" className="text-slate-200 flex items-center gap-2 mb-2">
                <CalendarIcon className="w-5 h-5" /> {t("athleteProfile.selectDate")}
              </Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 text-white focus:border-purple-500"
              />
            </motion.div>

            <motion.div variants={shouldReduceMotion ? fadeIn : fadeInUp}>
              <Label htmlFor="time" className="text-slate-200 flex items-center gap-2 mb-2">
                <ClockIcon className="w-5 h-5" /> {t("athleteProfile.selectTime")}
              </Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 text-white focus:border-purple-500"
              />
            </motion.div>

            <motion.div variants={shouldReduceMotion ? fadeIn : fadeInUp}>
              <Label htmlFor="message" className="text-slate-200 flex items-center gap-2 mb-2">
                <MessageSquareIcon className="w-5 h-5" /> {t("athleteProfile.sendMessagePlaceholder")}
              </Label>
              <Textarea
                id="message"
                placeholder={t("athleteProfile.sendMessagePlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 min-h-[100px]"
              />
            </motion.div>

            <Button
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              {t("booking.confirm")}
            </Button>
          </div>
        )}

        {bookingStatus === "success" && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
            className="text-center space-y-4"
          >
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
            <h3 className="text-3xl font-bold text-green-400">{t("athleteProfile.bookingSuccess")}</h3>
            <p className="text-slate-300">
              {t("booking.athleteName").replace("{name}", athlete.name)} on {selectedDate} at {selectedTime}.
            </p>
            <Button
              onClick={() => router.push(`/athletes/${athlete.id}`)}
              className="mt-6 bg-purple-500/20 text-purple-400 border border-purple-500 hover:bg-purple-500/30 transition-colors"
            >
              {t("booking.backToProfile")}
            </Button>
          </motion.div>
        )}

        {bookingStatus === "error" && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
            className="text-center space-y-4"
          >
            <XCircleIcon className="w-20 h-20 text-red-500 mx-auto" />
            <h3 className="text-3xl font-bold text-red-400">{t("athleteProfile.bookingError")}</h3>
            <p className="text-slate-300">{t("booking.tryAgain")}</p>
            <Button
              onClick={() => setBookingStatus("idle")}
              className="mt-6 bg-purple-500/20 text-purple-400 border border-purple-500 hover:bg-purple-500/30 transition-colors"
            >
              {t("booking.tryAgainButton")}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
