# API Integration Setup for Rent a Pro

## Environment Setup

1. Create a `.env.local` file in your project root:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost/rentapro/api/v1
NEXT_PUBLIC_API_KEY=your_frontend_key

# For production (update when deploying)
# NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api/v1
# NEXT_PUBLIC_API_KEY=your_production_key
```

## Changing the API Endpoint

To switch from local to live server, simply update the `.env.local` file:

```env
# For Live Server
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api/v1
NEXT_PUBLIC_API_KEY=your_production_key
```

The API configuration will automatically pick up these environment variables.

## Features Implemented

### 1. Athletes Listing (`/athletes`)
- ✅ Fetches athletes from API with pagination
- ✅ Search and filtering by sport, location
- ✅ Loading states and error handling
- ✅ Responsive pagination

### 2. Individual Athlete Profile (`/athletes/[id]`)
- ✅ Fetches single athlete details
- ✅ Displays all athlete information (bio, specializations, certifications, etc.)
- ✅ Loading and error states
- ✅ Back navigation

### 3. Become a Trainer (`/register-athlete`)
- ✅ Multi-step form with validation
- ✅ File upload support (profile picture, documents)
- ✅ API integration for application submission
- ✅ Success/error handling
- ✅ Form reset functionality

## API Integration Structure

```
lib/
├── api.ts              # API configuration
├── apiUtils.ts         # Response handling & types
hooks/
├── useAthletes.ts      # Athletes listing hook
├── useAthlete.ts       # Single athlete hook
└── useApplicationSubmission.ts  # Application submission hook
```

## Key Features

1. **Easy Endpoint Management**: Change API base URL in one place (environment variables)
2. **Type Safety**: Full TypeScript integration with API response types
3. **Error Handling**: Comprehensive error handling with user-friendly messages
4. **Loading States**: Proper loading indicators throughout
5. **File Uploads**: Support for profile pictures and document attachments
6. **Pagination**: Full pagination support with navigation
7. **Search & Filtering**: Real-time search with debouncing

## Testing the Integration

1. Start your backend API server
2. Update the `.env.local` file with correct API URL
3. Run the Next.js application:
   ```bash
   npm run dev
   ```
4. Test the following:
   - Visit `/athletes` to see the athletes list
   - Click on an athlete to view their profile
   - Visit `/register-athlete` to submit a trainer application

## Backend API Requirements

Ensure your backend API returns data in the expected format as documented in `FRONTEND_INTEGRATION.md`.

### Athletes Endpoint Response:
```json
{
  "success": true,
  "message": "Athletes retrieved successfully",
  "data": {
    "athletes": [...],
    "pagination": {...}
  }
}
```

### Application Submission Response:
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "application_id": 15,
    "status": "pending",
    "message": "Application under review"
  }
}
```

## Troubleshooting

1. **CORS Issues**: Ensure your backend API has proper CORS headers
2. **404 Errors**: Check that API endpoints are correctly implemented
3. **Environment Variables**: Make sure `.env.local` file is in the project root
4. **File Uploads**: Ensure backend supports multipart/form-data for file uploads

## Next Steps

1. Deploy your backend API to a live server
2. Update the environment variables for production
3. Test the integration with the live API
4. Implement additional features like booking, reviews, etc. 