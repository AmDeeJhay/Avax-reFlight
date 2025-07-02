import axios from 'axios';
import { MarketplaceListing } from "./types";


const API_BASE_URL = 'https://reflights.onrender.com';

function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    // Save token to localStorage
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'Login failed';
  }
}

export async function signupUser(userData: { email: string; password: string; name?: string }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'Signup failed';
  }
}

export async function fetchFromApi(endpoint: string, params = {}) {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      params,
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

export async function createFlight(flightData: any) {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/api/flights`, flightData, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

export async function getFlightById(flightId: string) {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/api/flights/${flightId}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Search flights (GET /api/flights)
export async function searchFlights(params = {}) {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/api/flights`, {
      params,
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Get Duffel offer details (GET /api/flights/duffel/offers/{offerId})
export async function getDuffelOfferDetails(offerId: string) {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/api/flights/duffel/offers/${offerId}`, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Create a flight order with Duffel (POST /api/flights/duffel/orders)
export async function createDuffelOrder(orderData: any) {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/api/flights/duffel/orders`, orderData, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Search airports (GET /api/flights/airports)
export async function searchAirports(params = {}) {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/api/flights/airports`, {
      params,
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Book a flight ticket (POST /api/tickets/book)
export async function bookTicket(ticketData: any) {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/api/tickets/book`, ticketData, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Get user's tickets (GET /api/tickets/me)
export async function getMyTickets() {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/api/tickets/me`, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// List ticket for resale (POST /api/tickets/{ticketId}/list)
export async function listTicketForResale(ticketId: string, data: any) {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/api/tickets/${ticketId}/list`, data, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Buy a listed ticket (POST /api/tickets/{ticketId}/buy)
export async function buyTicket(ticketId: string) {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/api/tickets/${ticketId}/buy`, {}, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Get ticket by ID (GET /api/tickets/{ticketId})
export async function getTicketById(ticketId: string) {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/api/tickets/${ticketId}`, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '' },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}
