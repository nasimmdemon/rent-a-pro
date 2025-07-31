"use client"

import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FilterIcon, XIcon } from "lucide-react"
import AthleteCard from "@/components/AthleteCard"
import SearchFilter from "@/components/SearchFilter"
import { useLanguage } from "@/contexts/LanguageContext"
import { staggerContainer, pageTransition, reducedMotionFadeIn } from "@/lib/animations"
import { getAthleteImageUrl } from "@/lib/utils"
import API_CONFIG from "@/lib/api"
// import { useAthletes } from "@/hooks/useAthletes" // Removed problematic hook

export default function AthletesPage() {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    search: "",
    sport: "",
    location: "",
    priceRange: "",
    page: 1,
  })
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Direct API call instead of problematic hook
  const [athletes, setAthletes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_records: 0,
    limit: 12
  })

  const fetchAthletes = async (options: any = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        page: String(options.page || filters.page || 1),
        limit: String(options.limit || 12),
        status: 'active',
        ...(options.search && { search: options.search }),
        ...(options.sport_category && { sport_category: options.sport_category }),
        ...(options.location && { location: options.location }),
      })

      const response = await fetch(`${API_CONFIG.BASE_URL}/athletes.php?${params}`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS
      })

      const result = await response.json()
      console.log('✅ API Response:', result)
      
      if (result.success) {
        setAthletes(result.data.athletes || [])
        setPagination(result.data.pagination || {})
        console.log('✅ Athletes loaded:', result.data.athletes?.length || 0)
      } else {
        throw new Error(result.message || 'API request failed')
      }
    } catch (err: any) {
      console.error('❌ API Error:', err)
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Initial load when component mounts
  useEffect(() => {
    fetchAthletes()
  }, [])

  // Handle filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAthletes({
        page: 1, // Reset to first page when filters change
        limit: 12,
        search: filters.search || undefined,
        sport_category: filters.sport || undefined,
        location: filters.location || undefined,
        status: 'active'
      })
      setFilters(prev => ({ ...prev, page: 1 }))
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [filters.search, filters.sport, filters.location])

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }))
    fetchAthletes({
      page: newPage,
      limit: 12,
      search: filters.search || undefined,
      sport_category: filters.sport || undefined,
      location: filters.location || undefined,
      status: 'active'
    })
  }

  // Hardcoded as fallback, could be fetched from API sport-categories endpoint
  const sportsOptions = ["", "Football", "Tennis", "Basketball", "Gymnastics", "Athletics", "Swimming"]
  const priceOptions = ["", "$50 - $100", "$100 - $200", "$200+"]

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pt-20 bg-slate-900"
    >
      {/* Hero Section */}
      <section className="py-12 bg-slate-800/50 text-center">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {t("athletesPage.title")}
          </h1>
          <p className="text-xl text-slate-300">{t("athletesPage.description")}</p>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Desktop Filters */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
            className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-lg h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">{t("athletesPage.filtersTitle")}</h2>
            <SearchFilter
              filters={filters}
              setFilters={setFilters}
              sportsOptions={sportsOptions}
              priceOptions={priceOptions}
            />
          </motion.div>

          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-end mb-4">
            <motion.button
              onClick={() => setIsFilterPanelOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
            >
              <FilterIcon className="w-5 h-5" />
              <span>{t("athletesPage.openFilters")}</span>
            </motion.button>
          </div>

          {/* Mobile Filter Panel */}
          {isFilterPanelOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{t("athletesPage.filtersTitle")}</h2>
                <button onClick={() => setIsFilterPanelOpen(false)} className="text-slate-300 hover:text-purple-400">
                  <XIcon className="w-8 h-8" />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <SearchFilter
                  filters={filters}
                  setFilters={setFilters}
                  sportsOptions={sportsOptions}
                  priceOptions={priceOptions}
                />
              </div>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg"
              >
                {t("athletesPage.applyFilters")}
              </button>
            </motion.div>
          )}

          {/* Athlete List */}
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            animate="animate"
            className="w-full md:w-3/4 lg:w-4/5"
          >
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <span className="ml-4 text-slate-300">Loading athletes...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-400 text-xl mb-4">Error: {error}</div>
                <button 
                  onClick={() => fetchAthletes()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {athletes.length > 0 ? (
                    athletes.map((athlete, index) => (
                      <AthleteCard 
                        key={athlete.id} 
                        athlete={{
                          id: String(athlete.id),
                          name: athlete.full_name,
                          sport: athlete.sport_category,
                          location: athlete.location,
                          price: `$${athlete.hourly_rate}/hr`,
                          rating: parseFloat(athlete.rating),
                          image: getAthleteImageUrl(athlete.profile_picture),
                          description: athlete.bio,
                        }} 
                        index={index} 
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
                      className="col-span-full text-center text-slate-400 text-xl py-10"
                    >
                      {t("athletesPage.noAthletesFound")}
                    </motion.div>
                  )}
                </div>

                {/* Pagination */}
                {pagination.total_pages > 1 && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
                    className="flex justify-center items-center mt-12 space-x-2"
                  >
                    <button
                      onClick={() => handlePageChange(Math.max(1, pagination.current_page - 1))}
                      disabled={pagination.current_page === 1}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
                    >
                      Previous
                    </button>
                    
                    {[...Array(pagination.total_pages)].map((_, i) => {
                      const pageNum = i + 1;
                      const isCurrentPage = pageNum === pagination.current_page;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                            isCurrentPage
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(Math.min(pagination.total_pages, pagination.current_page + 1))}
                      disabled={pagination.current_page === pagination.total_pages}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
                    >
                      Next
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
