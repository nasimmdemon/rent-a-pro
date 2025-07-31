// API utility functions for handling responses and errors
export const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.message || 'Something went wrong'
  };
};

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface Athlete {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  profile_picture?: string;
  bio: string;
  sport_category: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  hourly_rate: string;
  location: string;
  specializations?: string;
  certifications?: string;
  achievements?: string;
  rating: string;
  total_reviews: number;
  total_bookings?: number;
  status: 'active' | 'inactive' | 'pending';
}

export interface AthleteListResponse {
  athletes: Athlete[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_records: number;
    limit: number;
  };
}

export interface ApplicationData {
  full_name: string;
  email: string;
  phone: string;
  sport_category: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  bio: string;
  hourly_rate?: number;
  location: string;
  specializations?: string;
  certifications?: string;
  achievements?: string;
}

export interface ApplicationResponse {
  application_id: number;
  status: 'pending';
  message: string;
} 