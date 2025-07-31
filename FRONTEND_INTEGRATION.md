# Frontend Integration Guide - Rent a Pro API

This guide covers the essential API operations for your Next.js frontend application.

## 🚀 Quick Setup

### Base Configuration
```javascript
// lib/api.js
const API_CONFIG = {
  BASE_URL: 'http://localhost/rentapro/api/v1',
  API_KEY: 'your_frontend_key', // Use your production key in production
  HEADERS: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_frontend_key'
  }
};

export default API_CONFIG;
```

### Error Handling Utility
```javascript
// lib/apiUtils.js
export const handleApiResponse = async (response) => {
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.message || 'Something went wrong'
  };
};
```

---

## 📋 1. Fetching All Athletes

### API Endpoint
**GET** `/api/v1/athletes.php`

### React Hook Implementation
```javascript
// hooks/useAthletes.js
import { useState, useEffect } from 'react';
import API_CONFIG from '../lib/api';
import { handleApiResponse, handleApiError } from '../lib/apiUtils';

export const useAthletes = (filters = {}) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchAthletes = async (options = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: options.page || filters.page || 1,
        limit: options.limit || filters.limit || 10,
        ...(options.search && { search: options.search }),
        ...(options.status && { status: options.status }),
        ...filters
      });

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/athletes.php?${params}`,
        {
          method: 'GET',
          headers: API_CONFIG.HEADERS
        }
      );

      const result = await handleApiResponse(response);
      
      setAthletes(result.data.athletes);
      setPagination(result.data.pagination);
      
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
```

### Component Usage Example
```javascript
// components/AthletesList.jsx
import { useAthletes } from '../hooks/useAthletes';
import { useState } from 'react';

export default function AthletesList() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    status: 'active'
  });
  
  const { athletes, loading, error, pagination, fetchAthletes } = useAthletes(filters);

  const handleSearch = (searchTerm) => {
    fetchAthletes({ ...filters, search: searchTerm, page: 1 });
  };

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    fetchAthletes(newFilters);
  };

  if (loading) return <div className="loading">Loading athletes...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="athletes-list">
      <div className="athletes-header">
        <h2>Available Athletes ({pagination.total_records})</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="athletes-grid">
        {athletes.map(athlete => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>

      {pagination.total_pages > 1 && (
        <Pagination 
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

// Athlete Card Component
function AthleteCard({ athlete }) {
  return (
    <div className="athlete-card">
      <div className="athlete-avatar">
        <img 
          src={athlete.profile_picture || '/default-athlete.jpg'} 
          alt={athlete.full_name}
        />
      </div>
      <h3>{athlete.full_name}</h3>
      <p className="sport">{athlete.sport_category}</p>
      <p className="experience">{athlete.experience_level}</p>
      <p className="rate">${athlete.hourly_rate}/hour</p>
      <p className="location">{athlete.location}</p>
      <button 
        onClick={() => window.location.href = `/athletes/${athlete.id}`}
        className="view-details-btn"
      >
        View Details
      </button>
    </div>
  );
}
```

### API Response Format
```json
{
  "success": true,
  "message": "Athletes retrieved successfully",
  "data": {
    "athletes": [
      {
        "id": 1,
        "full_name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "sport_category": "Tennis",
        "experience_level": "professional",
        "hourly_rate": "50.00",
        "location": "New York",
        "bio": "Professional tennis coach...",
        "specializations": "Youth training, Fitness",
        "rating": "4.8",
        "total_reviews": 25,
        "status": "active",
        "profile_picture": "uploads/athletes/profile.jpg"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_records": 48,
      "limit": 10
    }
  }
}
```

---

## 👤 2. Get Single Athlete Details

### API Endpoint
**GET** `/api/v1/athletes.php?id={id}`

### React Hook Implementation
```javascript
// hooks/useAthlete.js
import { useState, useEffect } from 'react';
import API_CONFIG from '../lib/api';
import { handleApiResponse, handleApiError } from '../lib/apiUtils';

export const useAthlete = (athleteId) => {
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAthlete = async (id = athleteId) => {
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
      setAthlete(result.data);
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
```

### Component Usage Example
```javascript
// pages/athletes/[id].js (Next.js dynamic route)
import { useRouter } from 'next/router';
import { useAthlete } from '../../hooks/useAthlete';

export default function AthleteProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { athlete, loading, error } = useAthlete(id);

  if (loading) return <div className="loading">Loading athlete profile...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!athlete) return <div>Athlete not found</div>;

  return (
    <div className="athlete-profile">
      <div className="athlete-header">
        <div className="athlete-avatar-large">
          <img 
            src={athlete.profile_picture || '/default-athlete.jpg'} 
            alt={athlete.full_name}
          />
        </div>
        <div className="athlete-info">
          <h1>{athlete.full_name}</h1>
          <p className="sport-category">{athlete.sport_category} Coach</p>
          <p className="experience">{athlete.experience_level} Level</p>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span>({athlete.rating}/5.0 - {athlete.total_reviews} reviews)</span>
          </div>
          <p className="hourly-rate">${athlete.hourly_rate}/hour</p>
        </div>
      </div>

      <div className="athlete-details">
        <section className="bio-section">
          <h3>About</h3>
          <p>{athlete.bio}</p>
        </section>

        <section className="specializations-section">
          <h3>Specializations</h3>
          <div className="tags">
            {athlete.specializations?.split(',').map((spec, index) => (
              <span key={index} className="tag">{spec.trim()}</span>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <h3>Contact Information</h3>
          <p><strong>Location:</strong> {athlete.location}</p>
          <p><strong>Phone:</strong> {athlete.phone}</p>
          <p><strong>Email:</strong> {athlete.email}</p>
        </section>

        {athlete.certifications && (
          <section className="certifications-section">
            <h3>Certifications</h3>
            <p>{athlete.certifications}</p>
          </section>
        )}

        {athlete.achievements && (
          <section className="achievements-section">
            <h3>Achievements</h3>
            <p>{athlete.achievements}</p>
          </section>
        )}
      </div>

      <div className="booking-section">
        <button className="book-now-btn">
          Book Training Session
        </button>
        <button className="contact-btn">
          Contact Athlete
        </button>
      </div>
    </div>
  );
}
```

### API Response Format
```json
{
  "success": true,
  "message": "Athlete retrieved successfully",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "profile_picture": "uploads/athletes/profile.jpg",
    "bio": "Professional tennis coach with 10+ years experience...",
    "sport_category": "Tennis",
    "experience_level": "professional",
    "hourly_rate": "50.00",
    "location": "New York, NY",
    "specializations": "Youth training, Competitive play, Fitness",
    "certifications": "USPTA Certified, CPR Certified",
    "achievements": "Former college player, Tournament winner",
    "rating": "4.8",
    "total_reviews": 25,
    "total_bookings": 150,
    "status": "active"
  }
}
```

---

## 📝 3. Create Pending Athlete Application

### API Endpoint
**POST** `/api/v1/applications.php`

### React Hook Implementation
```javascript
// hooks/useApplicationSubmission.js
import { useState } from 'react';
import API_CONFIG from '../lib/api';
import { handleApiResponse, handleApiError } from '../lib/apiUtils';

export const useApplicationSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitApplication = async (applicationData, files = {}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let body;
      let headers = { 'X-API-Key': API_CONFIG.API_KEY };

      // Handle file uploads
      if (files.profilePicture || files.attachments) {
        const formData = new FormData();
        
        // Add all form fields
        Object.keys(applicationData).forEach(key => {
          formData.append(key, applicationData[key]);
        });

        // Add profile picture
        if (files.profilePicture) {
          formData.append('profile_picture', files.profilePicture);
        }

        // Add attachments
        if (files.attachments && files.attachments.length > 0) {
          Array.from(files.attachments).forEach((file, index) => {
            formData.append(`attachments[]`, file);
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
```

### Component Usage Example
```javascript
// components/AthleteApplicationForm.jsx
import { useState } from 'react';
import { useApplicationSubmission } from '../hooks/useApplicationSubmission';

export default function AthleteApplicationForm() {
  const { submitApplication, loading, error, success, resetState } = useApplicationSubmission();
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    sport_category: '',
    experience_level: 'intermediate',
    bio: '',
    hourly_rate: '',
    location: '',
    specializations: '',
    certifications: '',
    achievements: ''
  });

  const [files, setFiles] = useState({
    profilePicture: null,
    attachments: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles(prev => ({
      ...prev,
      [name]: name === 'attachments' ? selectedFiles : selectedFiles[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetState();

    // Validate required fields
    const requiredFields = ['full_name', 'email', 'phone', 'sport_category', 'bio'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      alert('Please enter a valid phone number');
      return;
    }

    const result = await submitApplication(formData, files);
    
    if (result.success) {
      alert('Application submitted successfully! We will review it shortly.');
      // Reset form or redirect
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        sport_category: '',
        experience_level: 'intermediate',
        bio: '',
        hourly_rate: '',
        location: '',
        specializations: '',
        certifications: '',
        achievements: ''
      });
      setFiles({ profilePicture: null, attachments: null });
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h2>✅ Application Submitted Successfully!</h2>
        <p>Thank you for your interest in becoming an athlete on our platform.</p>
        <p>We will review your application and get back to you within 2-3 business days.</p>
        <button onClick={resetState} className="submit-another-btn">
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="athlete-application-form">
      <h2>Become an Athlete</h2>
      <p>Join our platform and start coaching today!</p>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}

      {/* Personal Information */}
      <section className="form-section">
        <h3>Personal Information</h3>
        
        <div className="form-group">
          <label htmlFor="full_name">Full Name *</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1234567890"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="City, State"
          />
        </div>
      </section>

      {/* Professional Information */}
      <section className="form-section">
        <h3>Professional Information</h3>
        
        <div className="form-group">
          <label htmlFor="sport_category">Sport Category *</label>
          <select
            id="sport_category"
            name="sport_category"
            value={formData.sport_category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a sport</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Swimming">Swimming</option>
            <option value="Soccer">Soccer</option>
            <option value="Baseball">Baseball</option>
            <option value="Boxing">Boxing</option>
            <option value="Gym Training">Gym Training</option>
            <option value="Running">Running</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience_level">Experience Level *</label>
          <select
            id="experience_level"
            name="experience_level"
            value={formData.experience_level}
            onChange={handleInputChange}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hourly_rate">Hourly Rate ($)</label>
          <input
            type="number"
            id="hourly_rate"
            name="hourly_rate"
            value={formData.hourly_rate}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            placeholder="50.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio/Description *</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="4"
            placeholder="Tell us about your coaching experience, philosophy, and what makes you unique..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specializations">Specializations</label>
          <input
            type="text"
            id="specializations"
            name="specializations"
            value={formData.specializations}
            onChange={handleInputChange}
            placeholder="Youth training, Competitive play, Fitness (comma separated)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="certifications">Certifications</label>
          <textarea
            id="certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleInputChange}
            rows="2"
            placeholder="List your relevant certifications..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="achievements">Achievements</label>
          <textarea
            id="achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleInputChange}
            rows="2"
            placeholder="Notable achievements, awards, or accomplishments..."
          />
        </div>
      </section>

      {/* File Uploads */}
      <section className="form-section">
        <h3>Files (Optional)</h3>
        
        <div className="form-group">
          <label htmlFor="profile_picture">Profile Picture</label>
          <input
            type="file"
            id="profile_picture"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
          />
          <small>Upload a professional photo (JPG, PNG)</small>
        </div>

        <div className="form-group">
          <label htmlFor="attachments">Certificates/Documents</label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <small>Upload certificates, references, or other documents</small>
        </div>
      </section>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
```

### API Request Format
```json
{
  "full_name": "Alex Wilson",
  "email": "alex@example.com",
  "phone": "+1234567890",
  "sport_category": "Swimming",
  "experience_level": "advanced",
  "bio": "Swimming instructor with 8 years experience in competitive swimming and stroke technique development.",
  "hourly_rate": 35.00,
  "location": "Miami, FL",
  "specializations": "Competitive swimming, Stroke technique, Water safety",
  "certifications": "American Red Cross Water Safety Instructor, USA Swimming Certified",
  "achievements": "Former college swimmer, State championship winner"
}
```

### API Response Format
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "application_id": 15,
    "status": "pending",
    "message": "Your application has been submitted successfully and is under review."
  }
}
```

---

## 🎨 CSS Styling Examples

```css
/* Basic styling for components */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.error {
  background-color: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.success-message {
  background-color: #efe;
  border: 1px solid #cfc;
  color: #363;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.athletes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.athlete-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s;
}

.athlete-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.athlete-application-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
```

---

## 🔧 Environment Variables

Create a `.env.local` file in your Next.js project:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost/rentapro/api/v1
NEXT_PUBLIC_API_KEY=your_frontend_key

# For production
# NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api/v1
# NEXT_PUBLIC_API_KEY=your_production_key
```

Then update your API config:

```javascript
// lib/api.js
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  HEADERS: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
  }
};
```

---

## 🚀 Getting Started Checklist

1. ✅ Copy the hooks (`useAthletes.js`, `useAthlete.js`, `useApplicationSubmission.js`)
2. ✅ Create the API configuration (`lib/api.js`, `lib/apiUtils.js`)
3. ✅ Set up environment variables (`.env.local`)
4. ✅ Implement the components as needed
5. ✅ Add CSS styling
6. ✅ Test with your backend API

Your API is ready and these code examples will get you started immediately with your Next.js frontend! 🎉 