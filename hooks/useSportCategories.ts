import { useState, useEffect } from 'react';
import API_CONFIG from '@/lib/api';
import { handleApiResponse, handleApiError } from '@/lib/apiUtils';

export interface SportCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  is_active: boolean;
}

export const useSportCategories = () => {
  const [categories, setCategories] = useState<SportCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/sport-categories.php`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS
      });

      const result = await handleApiResponse(response);
      setCategories(result.data || []);
      
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
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  };
};