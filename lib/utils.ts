import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Constructs a full URL for athlete profile pictures
 * @param profilePicture - The profile picture path from the API
 * @returns The full URL to the profile picture or a placeholder
 */
export function getAthleteImageUrl(profilePicture: string | null | undefined): string {
  // If no profile picture, return placeholder
  if (!profilePicture) {
    return "/placeholder.svg?height=200&width=200"
  }

  // If it's already a full URL, return as-is
  if (profilePicture.startsWith('http://') || profilePicture.startsWith('https://')) {
    return profilePicture
  }

  // Construct the full URL using the correct domain
  const baseUrl = 'https://rentapro.emonadi.com'
  
  // Clean up the path: remove leading slashes and fix double slashes
  let cleanPath = profilePicture.startsWith('/') ? profilePicture.slice(1) : profilePicture
  cleanPath = cleanPath.replace(/\/+/g, '/') // Replace multiple slashes with single slash
  
  return `${baseUrl}/${cleanPath}`
}
