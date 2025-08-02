"use client"

import type React from "react"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { CheckIcon, ArrowRightIcon, ArrowLeftIcon, UserIcon, MailIcon, PhoneIcon, MapPinIcon, UploadIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { pageTransition, reducedMotionFadeIn, fadeInUp, staggerContainer } from "@/lib/animations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useApplicationSubmission } from "@/hooks/useApplicationSubmission"
import type { ApplicationData } from "@/lib/apiUtils"

export default function RegisterAthletePage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const shouldReduceMotion = useReducedMotion()
  const { submitApplication, loading, error, success, resetState } = useApplicationSubmission()

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Location & Services
    city: "",
    sport_category: "",
    experience_level: "intermediate" as const,
    // Pricing & Profile
    hourlyRate: "",
    bio: "",
    specializations: "",
    certifications: "",
    achievements: "",
  })

  const [files, setFiles] = useState<{
    profilePicture: File | null;
    attachments: FileList | null;
  }>({
    profilePicture: null,
    attachments: null,
  })

  const steps = [
    { number: 1, title: t("registerAthlete.steps.step1") },
    { number: 2, title: t("registerAthlete.steps.step2") },
    { number: 3, title: t("registerAthlete.steps.step3") },
    { number: 4, title: t("registerAthlete.steps.step4") },
  ]

  const sportsOptions = [
    t("registerAthlete.sports.basketball"),
    t("registerAthlete.sports.tennis"),
    t("registerAthlete.sports.soccer"),
    t("registerAthlete.sports.swimming"),
    t("registerAthlete.sports.boxing"),
    t("registerAthlete.sports.yoga"),
    t("registerAthlete.sports.running"),
    t("registerAthlete.sports.golf"),
    t("registerAthlete.sports.baseball"),
    t("registerAthlete.sports.volleyball"),
    t("registerAthlete.sports.football"),
    t("registerAthlete.sports.gymTraining"),
  ]

  const experienceLevels = [
    { value: "beginner", label: t("registerAthlete.experienceLevels.beginner") },
    { value: "intermediate", label: t("registerAthlete.experienceLevels.intermediate") },
    { value: "advanced", label: t("registerAthlete.experienceLevels.advanced") },
    { value: "professional", label: t("registerAthlete.experienceLevels.professional") },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'profilePicture' | 'attachments') => {
    const selectedFiles = e.target.files
    if (fileType === 'profilePicture' && selectedFiles && selectedFiles.length > 0) {
      setFiles(prev => ({ ...prev, profilePicture: selectedFiles[0] }))
    } else if (fileType === 'attachments' && selectedFiles) {
      setFiles(prev => ({ ...prev, attachments: selectedFiles }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    resetState()

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'sport_category', 'bio']
    const missingFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData]
      return !value || (typeof value === 'string' && !value.trim())
    })
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    // Prepare application data
    const applicationData: ApplicationData = {
      full_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      sport_category: formData.sport_category,
      experience_level: formData.experience_level,
      bio: formData.bio,
      location: formData.city,
      specializations: formData.specializations,
      certifications: formData.certifications,
      achievements: formData.achievements,
      ...(formData.hourlyRate && { hourly_rate: parseFloat(formData.hourlyRate) })
    }

    const result = await submitApplication(applicationData, files)
    
    if (result.success) {
      // Form will show success state automatically
    }
  }

  const nextStep = () => {
    // Validate current step before proceeding
    let isValid = true
    let missingFields: string[] = []

    switch (currentStep) {
      case 1:
        // Personal Information validation
        if (!formData.firstName?.trim()) missingFields.push("First Name")
        if (!formData.lastName?.trim()) missingFields.push("Last Name")
        if (!formData.email?.trim()) missingFields.push("Email")
        if (!formData.phone?.trim()) missingFields.push("Phone")
        if (!formData.city?.trim()) missingFields.push("City")
        break
      case 2:
        // Professional Details validation
        if (!formData.sport_category?.trim()) missingFields.push("Sport Category")
        if (!formData.experience_level?.trim()) missingFields.push("Experience Level")
        if (!formData.hourlyRate?.trim()) missingFields.push("Hourly Rate")
        break
      case 3:
        // Additional Information validation
        if (!formData.bio?.trim()) missingFields.push("Bio")
        break
      case 4:
        // Review step - no validation needed
        break
    }

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Show success state
  if (success) {
    return (
      <motion.div
        variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12 pt-24"
      >
        <Card className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-xl border border-slate-700 text-white shadow-2xl">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Application Submitted Successfully!
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Thank you for your interest in becoming a trainer on our platform.
              </p>
              <p className="text-slate-400 mb-8">
                We will review your application and get back to you within 2-3 business days.
              </p>
              <Button 
                onClick={() => {
                  resetState()
                  setCurrentStep(1)
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    city: "",
                    sport_category: "",
                    experience_level: "intermediate",
                    hourlyRate: "",
                    bio: "",
                    specializations: "",
                    certifications: "",
                    achievements: "",
                  })
                  setFiles({ profilePicture: null, attachments: null })
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Submit Another Application
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionFadeIn : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12 pt-24"
    >
      <Card className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-xl border border-slate-700 text-white shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
          >
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Become a Trainer
            </CardTitle>
            <CardDescription className="text-slate-300 mt-2">
              Join our platform and share your expertise with athletes worldwide
            </CardDescription>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {currentStep > step.number ? <CheckIcon className="w-5 h-5" /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step.number ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
              {error}
            </div>
          )}

          <motion.div
            key={currentStep}
            variants={shouldReduceMotion ? reducedMotionFadeIn : staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {currentStep === 1 && (
              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
                <h2 className="text-2xl font-bold mb-6 text-center">Personal Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-200">
                        First Name *
                      </Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                          placeholder="John"
                          className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-200">
                        Last Name *
                      </Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Doe"
                          className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-200">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                        className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
                <h2 className="text-2xl font-bold mb-6 text-center">Professional Details</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-200">
                        Location
                      </Label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="city"
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                          placeholder="New York, NY"
                          className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate" className="text-slate-200">
                        Hourly Rate ($)
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                        placeholder="150"
                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sport_category" className="text-slate-200">
                      Sport Category *
                    </Label>
                    <select
                      id="sport_category"
                      value={formData.sport_category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sport_category: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select a sport</option>
                      {sportsOptions.map((sport) => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience_level" className="text-slate-200">
                      Experience Level *
                    </Label>
                    <select
                      id="experience_level"
                      value={formData.experience_level}
                      onChange={(e) => setFormData((prev) => ({ ...prev, experience_level: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-slate-200">
                      Biography *
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about your experience, coaching philosophy, and what makes you unique..."
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 min-h-[120px]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
                <h2 className="text-2xl font-bold mb-6 text-center">Additional Information</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="specializations" className="text-slate-200">
                      Specializations
                    </Label>
                    <Input
                      id="specializations"
                      type="text"
                      value={formData.specializations}
                      onChange={(e) => setFormData((prev) => ({ ...prev, specializations: e.target.value }))}
                      placeholder="Youth training, Competitive play, Fitness (comma separated)"
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications" className="text-slate-200">
                      Certifications
                    </Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications}
                      onChange={(e) => setFormData((prev) => ({ ...prev, certifications: e.target.value }))}
                      placeholder="List your relevant certifications..."
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements" className="text-slate-200">
                      Achievements
                    </Label>
                    <Textarea
                      id="achievements"
                      value={formData.achievements}
                      onChange={(e) => setFormData((prev) => ({ ...prev, achievements: e.target.value }))}
                      placeholder="Notable achievements, awards, or accomplishments..."
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                      rows={3}
                    />
                  </div>

                  {/* File Uploads */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile_picture" className="text-slate-200">
                        Profile Picture
                      </Label>
                      <div className="relative">
                        <UploadIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="file"
                          id="profile_picture"
                          onChange={(e) => handleFileChange(e, 'profilePicture')}
                          accept="image/*"
                          className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white file:bg-purple-500 file:text-white file:border-none file:rounded file:px-4 file:py-1 file:mr-4"
                        />
                      </div>
                      <p className="text-xs text-slate-400">Upload a professional photo (JPG, PNG)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="attachments" className="text-slate-200">
                        Certificates/Documents
                      </Label>
                      <div className="relative">
                        <UploadIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="file"
                          id="attachments"
                          onChange={(e) => handleFileChange(e, 'attachments')}
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white file:bg-purple-500 file:text-white file:border-none file:rounded file:px-4 file:py-1 file:mr-4"
                        />
                      </div>
                      <p className="text-xs text-slate-400">Upload certificates, references, or other documents</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div variants={shouldReduceMotion ? reducedMotionFadeIn : fadeInUp}>
                <h2 className="text-2xl font-bold mb-6 text-center">Review & Submit</h2>
                <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Application Summary</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Name:</span>
                      <span className="ml-2 text-white">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Email:</span>
                      <span className="ml-2 text-white">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Sport:</span>
                      <span className="ml-2 text-white">{formData.sport_category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Experience:</span>
                      <span className="ml-2 text-white capitalize">{formData.experience_level}</span>
                    </div>
                    {formData.city && (
                      <div>
                        <span className="text-slate-400">Location:</span>
                        <span className="ml-2 text-white">{formData.city}</span>
                      </div>
                    )}
                    {formData.hourlyRate && (
                      <div>
                        <span className="text-slate-400">Hourly Rate:</span>
                        <span className="ml-2 text-white">${formData.hourlyRate}</span>
                      </div>
                    )}
                  </div>

                  {formData.bio && (
                    <div>
                      <span className="text-slate-400 block mb-2">Biography:</span>
                      <p className="text-white text-sm bg-slate-900/50 p-3 rounded-lg">{formData.bio}</p>
                    </div>
                  )}

                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="text-purple-400 text-sm flex items-center">
                      <CheckIcon className="w-4 h-4 mr-2" />I agree to the Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex items-center space-x-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800 bg-transparent"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              )}

              <div className="ml-auto">
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <span>Continue</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
