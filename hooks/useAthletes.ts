import { useState, useEffect } from 'react';
import API_CONFIG from '@/lib/api';
import { handleApiResponse, handleApiError, type AthleteListResponse, type Athlete } from '@/lib/apiUtils';

interface UseAthletesFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sport_category?: string;
  location?: string;
}

export const useAthletes = (filters: UseAthletesFilters = {}) => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_records: 0,
    limit: 10
  });

  const fetchAthletes = async (options: UseAthletesFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: String(options.page || filters.page || 1),
        limit: String(options.limit || filters.limit || 12),
        ...(options.search && { search: options.search }),
        ...(options.status && { status: options.status }),
        ...(options.sport_category && { sport_category: options.sport_category }),
        ...(options.location && { location: options.location }),
        ...Object.fromEntries(
          Object.entries(filters).map(([key, value]) => [key, String(value)])
        )
      });

      const url = `${API_CONFIG.BASE_URL}/athletes.php?${params}`;
      console.log('🔍 API Request URL:', url);
      console.log('🔍 API Headers:', API_CONFIG.HEADERS);
      console.log('🔍 Request params:', Object.fromEntries(params));

      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.HEADERS
      });

      console.log('🔍 API Response Status:', response.status);
      console.log('🔍 API Response Headers:', response.headers);

      const result = await handleApiResponse(response);
      console.log('🔍 API Response Data:', result);
      
      const data = result.data as AthleteListResponse;
      console.log('🔍 Athletes found:', data.athletes?.length || 0);
      console.log('🔍 Pagination:', data.pagination);
      
      setAthletes(data.athletes || []);
      setPagination(data.pagination);
      
      return result;
    } catch (err) {
      const errorResult = handleApiError(err);
      setError(errorResult.message);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  return {
    athletes,
    loading,
    error,
    pagination,
    fetchAthletes,
    refetch: () => fetchAthletes()
  };
}; 