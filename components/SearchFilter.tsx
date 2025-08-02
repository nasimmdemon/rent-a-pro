"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SearchIcon, MapPinIcon, DollarSignIcon, TrophyIcon } from "lucide-react"
import { fadeInUp, reducedMotionFadeIn } from "@/lib/animations"
import { useLanguage } from "@/contexts/LanguageContext"

interface SearchFilterProps {
  filters: {
    search: string
    sport: string
    location: string
    priceRange: string
  }
  setFilters: (filters: any) => void
  sportsOptions: string[]
  priceOptions: string[]
}

export default function SearchFilter({ filters, setFilters, sportsOptions, priceOptions }: SearchFilterProps) {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }))
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Search Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-300">{t("athletesPage.search")}</label>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={t("athletesPage.searchPlaceholder")}
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Sport Filter */}
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-300">
          <TrophyIcon className="w-4 h-4 inline mr-2" />
          {t("athletesPage.sport")}
        </label>
        <select
          value={filters.sport}
          onChange={(e) => handleFilterChange("sport", e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 appearance-none backdrop-blur-sm text-white"
        >
          {sportsOptions.map((sport) => (
            <option key={sport} value={sport} className="bg-slate-800">
              {sport || t("athletesPage.allSports")}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-300">
          <MapPinIcon className="w-4 h-4 inline mr-2" />
          {t("athletesPage.location")}
        </label>
        <input
          type="text"
          placeholder={t("athletesPage.locationPlaceholder")}
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-slate-400"
        />
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-300">
          <DollarSignIcon className="w-4 h-4 inline mr-2" />
          {t("athletesPage.priceRange")}
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 appearance-none backdrop-blur-sm text-white"
        >
          {priceOptions.map((price) => (
            <option key={price} value={price} className="bg-slate-800">
              {price || t("athletesPage.anyPrice")}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <motion.button
        onClick={() => setFilters({ search: "", sport: "", location: "", priceRange: "" })}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className="w-full py-3 text-slate-400 hover:text-purple-400 border border-slate-600/50 hover:border-purple-500/50 rounded-xl transition-all duration-300 font-medium"
      >
        {t("athletesPage.clearFilters")}
      </motion.button>
    </motion.div>
  )
}
