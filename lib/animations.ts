"use client"

import type { Variants } from "framer-motion"

// Professional animation configurations
export const professionalTransition = {
  type: "spring" as const,
  damping: 25,
  stiffness: 120,
  mass: 1,
}

export const smoothTransition = {
  type: "tween" as const,
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
}

export const fastTransition = {
  type: "tween" as const,
  duration: 0.2,
  ease: "easeOut" as const,
}

// Core animation variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: smoothTransition },
  exit: { opacity: 0, transition: fastTransition },
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: professionalTransition },
  exit: { opacity: 0, y: -30, transition: fastTransition },
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0, transition: professionalTransition },
  exit: { opacity: 0, y: 30, transition: fastTransition },
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: professionalTransition },
  exit: { opacity: 0, x: 30, transition: fastTransition },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: professionalTransition },
  exit: { opacity: 0, x: -30, transition: fastTransition },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: professionalTransition },
  exit: { opacity: 0, scale: 0.95, transition: fastTransition },
}

export const slideInFromBottom: Variants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: professionalTransition },
  exit: { y: "100%", transition: fastTransition },
}

export const slideInFromTop: Variants = {
  initial: { y: "-100%" },
  animate: { y: 0, transition: professionalTransition },
  exit: { y: "-100%", transition: fastTransition },
}

export const slideInFromRight: Variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: professionalTransition },
  exit: { x: "100%", transition: fastTransition },
}

export const slideInFromLeft: Variants = {
  initial: { x: "-100%" },
  animate: { x: 0, transition: professionalTransition },
  exit: { x: "-100%", transition: fastTransition },
}

// Container animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const fastStaggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
}

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: smoothTransition,
}

export const hoverLift = {
  y: -4,
  scale: 1.01,
  transition: smoothTransition,
}

export const tapScale = {
  scale: 0.98,
  transition: fastTransition,
}

// Hero text animations
export const heroTextReveal: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      mass: 1.2,
    },
  },
}

export const heroTextStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const letterAnimation: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
    },
  },
}

// Mobile menu specific animations
export const mobileMenuOverlay: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

export const mobileMenuPanel: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      mass: 0.8,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.25,
      ease: "easeIn",
    },
  },
}

export const mobileMenuItems: Variants = {
  initial: { opacity: 0, x: 30, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    scale: 0.9,
    transition: fastTransition,
  },
}

// Reduced motion variants
export const reducedMotionFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export const reducedMotionContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.01,
    },
  },
}

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      mass: 1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
}

// Professional card animations
export const cardHover: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: smoothTransition,
  },
}

// Floating animations
export const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Pulse animation
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}
