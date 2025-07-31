// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rentapro.emonadi.com/api/v1',
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || 'your_frontend_key',
  HEADERS: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || 'your_frontend_key'
  }
};

export default API_CONFIG; 