
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/companies';

export const fetchCompanies = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createCompany = async (data: any) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const updateCompany = async (id: number, data: any) => {
  const res = await axios.put(`${API_BASE}/${id}`, data);
  return res.data;
};

export const deleteCompany = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
