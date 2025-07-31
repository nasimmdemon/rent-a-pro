import { useState, useEffect } from 'react';
import API_CONFIG from '@/lib/api';
import { handleApiResponse, handleApiError, type Athlete } from '@/lib/apiUtils';

export const useAthlete = (athleteId: string | number | null) => {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAthlete = async (id: string | number = athleteId || '') => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/athletes.php?id=${id}`,
        {
          method: 'GET',
          headers: API_CONFIG.HEADERS
        }
      );

      const result = await handleApiResponse(response);
      setAthlete(result.data as Athlete);
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
    if (athleteId) {
      fetchAthlete();
    }
  }, [athleteId]);

  return {
    athlete,
    loading,
    error,
    fetchAthlete,
    refetch: () => fetchAthlete()
  };
}; 