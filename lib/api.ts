import axios from 'axios';
import { MarketplaceListing } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = 'https://reflights.onrender.com';

export async function fetchFromApi(endpoint: string, params = {}) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      params,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    // Optionally, you can log or transform the error here
    throw error.response?.data || error.message || 'API request failed';
  }
}

export async function createFlight(flightData: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/flights`, flightData, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

export async function getFlightById(flightId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/flights/${flightId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Fetch a ticket by ID
export async function getTicketById(ticketId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Fetch all marketplace listings
export async function getMarketplaceListings(): Promise<MarketplaceListing[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/marketplace/listings`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Buy a listed ticket (no buyerData required unless your backend expects it)
export async function buyTicket(ticketId: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets/${ticketId}/buy`, {}, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Submit a marketplace offer for a listing
export async function makeMarketplaceOffer({ listingId, offerAmount, message }: { listingId: string, offerAmount: number, message?: string }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/marketplace/offers`, {
      listingId,
      offerAmount,
      message,
    }, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}