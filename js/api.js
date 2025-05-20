import { API_BASE_URL, ERROR_MSG } from './constants.js';

export async function fetchBrands(pageSize = 12, pageNumber = 1) {
  const url = `${API_BASE_URL}/random?pageSize=${pageSize}&pageNumber=${pageNumber}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(ERROR_MSG);
  const data = await res.json();
  return data.data || [];
}