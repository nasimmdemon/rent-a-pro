import { useState } from 'react';
import API_CONFIG from '@/lib/api';
import { handleApiResponse, handleApiError, type ApplicationData, type ApplicationResponse } from '@/lib/apiUtils';

interface Files {
  profilePicture?: File | null;
  attachments?: FileList | null;
}

export const useApplicationSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitApplication = async (applicationData: ApplicationData, files: Files = {}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let body: FormData | string;
      let headers: Record<string, string> = { 'X-API-Key': API_CONFIG.API_KEY };

      // Handle file uploads
      if (files.profilePicture || files.attachments) {
        const formData = new FormData();
        
        // Add all form fields
        Object.keys(applicationData).forEach(key => {
          const value = applicationData[key as keyof ApplicationData];
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        // Add profile picture
        if (files.profilePicture) {
          formData.append('profile_picture', files.profilePicture);
        }

        // Add attachments
        if (files.attachments && files.attachments.length > 0) {
          Array.from(files.attachments).forEach((file) => {
            formData.append('attachments[]', file);
          });
        }

        body = formData;
        // Don't set Content-Type for FormData (browser will set it with boundary)
      } else {
        // JSON only
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(applicationData);
      }

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/applications.php`,
        {
          method: 'POST',
          headers,
          body
        }
      );

      const result = await handleApiResponse(response);
      setSuccess(true);
      return result;
    } catch (err) {
      const errorResult = handleApiError(err);
      setError(errorResult.message);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    submitApplication,
    loading,
    error,
    success,
    resetState
  };
}; 