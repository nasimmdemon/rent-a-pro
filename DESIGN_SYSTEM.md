# Rent a Pro - Design System

## Typography

### Font Family
- **Primary Font**: Inter (Google Fonts)
  - Font weight: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
  - Font features: "cv02", "cv03", "cv04", "cv11"
  - Display: swap

### Font Sizes

#### Headings
- **Hero Title**: `text-4xl md:text-6xl lg:text-7xl` (28px → 60px → 72px)
- **Main Headings**: `text-2xl sm:text-3xl md:text-5xl` (24px → 30px → 48px)
- **Section Headings**: `text-2xl sm:text-3xl md:text-4xl` (24px → 30px → 36px)
- **Sub Headings**: `text-lg sm:text-xl` (18px → 20px)
- **Card Titles**: `text-xl` (20px)

#### Body Text
- **Large Body**: `text-xl md:text-2xl` (20px → 24px)
- **Medium Body**: `text-lg sm:text-xl` (18px → 20px)
- **Regular Body**: `text-sm sm:text-base` (14px → 16px)
- **Small Text**: `text-xs sm:text-base` (12px → 16px)

#### Special Text
- **Stats Numbers**: `text-2xl sm:text-4xl md:text-6xl` (24px → 36px → 60px)
- **Step Numbers**: `text-6xl sm:text-8xl` (60px → 96px)

### Font Weights
- **Bold**: `font-bold` (700)
- **Semibold**: `font-semibold` (600)
- **Medium**: `font-medium` (500)
- **Normal**: Default (400)

### Text Utilities
- **Text Balance**: `.text-balance` (text-wrap: balance)
- **Line Clamp**: `.line-clamp-3` (3 lines with ellipsis)
- **Antialiased**: Applied to body for smooth text rendering

## Colors

### Primary Colors
- **Purple Primary**: `#a855f7` (purple-500)
- **Purple Dark**: `#7c3aed` (purple-600)
- **Purple Light**: `#c084fc` (purple-400)
- **Pink Primary**: `#ec4899` (pink-500)
- **Pink Dark**: `#db2777` (pink-600)
- **Pink Light**: `#f472b6` (pink-400)

### Background Colors
- **Primary Background**: `#0f172a` (slate-900)
- **Secondary Background**: `#1e293b` (slate-800)
- **Card Background**: `#334155` (slate-700)
- **Muted Background**: `#475569` (slate-600)

### Text Colors
- **Primary Text**: `#ffffff` (white)
- **Secondary Text**: `#f1f5f9` (slate-100)
- **Muted Text**: `#cbd5e1` (slate-300)
- **Subtle Text**: `#94a3b8` (slate-400)
- **Disabled Text**: `#64748b` (slate-500)

### Accent Colors
- **Yellow**: `#fbbf24` (yellow-400) - for ratings
- **Green**: `#4ade80` (green-400) - for success states
- **Blue**: `#60a5fa` (blue-400) - for info states
- **Red**: `#f87171` (red-400) - for error states

### Border Colors
- **Primary Border**: `#475569` (slate-600)
- **Secondary Border**: `#64748b` (slate-500)
- **Accent Border**: `#a855f7` (purple-500)
- **Hover Border**: `#7c3aed` (purple-600)

### CSS Custom Properties (CSS Variables)
```css
:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}
```

## Gradients

### Primary Gradients
- **Purple to Pink**: `bg-gradient-to-r from-purple-500 to-pink-500`
- **Purple to Pink (Hover)**: `bg-gradient-to-r from-purple-600 to-pink-600`
- **Purple to Pink (Light)**: `bg-gradient-to-r from-purple-400 to-pink-400`

### Background Gradients
- **Hero Background**: `bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900`
- **Section Background**: `bg-gradient-to-r from-purple-500/10 to-pink-500/10`
- **Card Background**: `bg-gradient-to-br from-slate-800/50 to-purple-900/20`

### Text Gradients
- **Primary Text Gradient**: `bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`
- **Hero Title Gradient**: `linear-gradient(90deg, #ffffff, #a855f7, #ec4899, #ffffff)`

### Step Gradients
- **Step 1**: `from-blue-500 to-purple-500`
- **Step 2**: `from-purple-500 to-pink-500`
- **Step 3**: `from-pink-500 to-red-500`

### Benefit Gradients
- **Benefit 1**: `from-yellow-400 to-orange-500`
- **Benefit 2**: `from-green-400 to-blue-500`
- **Benefit 3**: `from-pink-400 to-purple-500`

### Scrollbar Gradients
- **Scrollbar Thumb**: `linear-gradient(180deg, #6d28d9, #ec4899)`
- **Scrollbar Hover**: `linear-gradient(180deg, #7c3aed, #f472b6)`

### Animation Gradients
- **Shimmer**: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)`
- **Loading Skeleton**: `linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)`

## Opacity Values

### Background Opacities
- **Light Overlay**: `/10` (10%)
- **Medium Overlay**: `/20` (20%)
- **Card Background**: `/30` (30%)
- **Modal Background**: `/50` (50%)
- **Dark Overlay**: `/60` (60%)
- **Heavy Overlay**: `/80` (80%)

### Border Opacities
- **Light Border**: `/50` (50%)
- **Medium Border**: `/50` (50%)

## Special Effects

### Glassmorphism
- **Glass Effect**: `background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px);`
- **Glass Dark**: `background: rgba(0, 0, 0, 0.2); backdrop-filter: blur(20px);`

### Backdrop Blur
- **Light Blur**: `backdrop-blur-sm` (4px)
- **Medium Blur**: `backdrop-blur-xl` (24px)
- **Heavy Blur**: `backdrop-blur-2xl` (40px)

### Shadows
- **Card Shadow**: `shadow-2xl`
- **Button Shadow**: `shadow-lg`
- **Purple Glow**: `shadow-purple-500/25`
- **Hover Glow**: `0 20px 40px rgba(168, 85, 247, 0.3)`

### Focus States
- **Input Focus**: `ring-2 ring-purple-500/50 ring-offset-2 ring-offset-slate-900`
- **Button Focus**: `focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`

## Responsive Breakpoints

### Tailwind Default Breakpoints
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Custom Container
- **Container Max Width**: `max-w-7xl` (1280px)
- **Container Padding**: `px-4 sm:px-6 lg:px-8`

## Animation Classes

### Framer Motion Variants
- **fadeInUp**: Fade in from bottom
- **fadeIn**: Simple fade in
- **staggerContainer**: Staggered animation container
- **hoverLift**: Lift on hover
- **tapScale**: Scale on tap
- **smoothTransition**: Smooth transition timing
- **reducedMotionFadeIn**: Reduced motion variant
- **pageTransition**: Page transition animation
- **heroTextReveal**: Hero text reveal animation
- **heroTextStagger**: Hero text staggered animation
- **floatingAnimation**: Floating animation
- **pulseAnimation**: Pulse animation

### Custom Animations
- **Float**: `animate-float` (6s ease-in-out infinite)
- **Glow**: `animate-glow` (2s ease-in-out infinite alternate)
- **Pulse Slow**: `animate-pulse-slow` (4s cubic-bezier infinite)
- **Shimmer**: `animate-shimmer` (2s infinite)

## Accessibility

### Reduced Motion
- **Media Query**: `@media (prefers-reduced-motion: reduce)`
- **Animation Duration**: 0.01ms for reduced motion users
- **Scroll Behavior**: Auto for reduced motion users

### Focus Management
- **Focus Ring**: Purple ring with offset
- **Focus Visible**: Proper focus indicators
- **Skip Links**: Proper skip navigation

### Color Contrast
- **Text Contrast**: WCAG AA compliant
- **Background Contrast**: High contrast backgrounds
- **Interactive Elements**: Clear hover and focus states

## Component-Specific Styles

### Buttons
- **Primary Button**: Purple to pink gradient with white text
- **Secondary Button**: Purple border with purple text
- **Ghost Button**: Transparent with purple text
- **Disabled State**: 50% opacity with disabled cursor

### Cards
- **Card Background**: Slate-800 with 50% opacity
- **Card Border**: Slate-700 with 50% opacity
- **Card Hover**: Purple border with 50% opacity
- **Card Shadow**: 2xl shadow

### Forms
- **Input Background**: Slate-900 with 50% opacity
- **Input Border**: Slate-600 with 50% opacity
- **Input Focus**: Purple border with ring
- **Placeholder**: Slate-400 color

### Navigation
- **Navbar Background**: Slate-900 with 95% opacity
- **Navbar Border**: Slate-800 with 50% opacity
- **Active Link**: Purple text
- **Hover State**: Purple text with scale

This design system ensures consistency across the entire Rent a Pro application while maintaining accessibility and modern design principles. 