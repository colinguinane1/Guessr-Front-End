// lib/axios.ts or utils/axios.ts
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,  // Use an environment variable to store the base URL
    headers: {
        'Content-Type': 'application/json',
        // Add other global headers if needed
    }
});

export default api;
