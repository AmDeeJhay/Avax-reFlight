import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = "https://reflights.onrender.com";

export async function getUserRefunds() {
  const response = await axios.get(`${API_BASE_URL}/user/refunds`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data;
}

export async function getUserRewards() {
  const response = await axios.get(`${API_BASE_URL}/user/rewards`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data;
}

export async function getUserNotifications() {
  const response = await axios.get(`${API_BASE_URL}/user/notifications`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data;
}
