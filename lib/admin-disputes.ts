import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = 'https://reflights.onrender.com';

// Fetch all disputes
export async function getAllDisputes() {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/disputes`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}

// Create a new dispute ticket
export async function createDisputeTicket(ticketData: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/disputes`, ticketData, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || 'API request failed';
  }
}
