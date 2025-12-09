import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const signup = async (email, password, name) => {
  const response = await api.post('/api/auth/signup', { email, password, name });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Keep the old function for backward compatibility if needed, but updated logic
export async function loginOrSignup(email, password, name) {
  if (name) {
    return signup(email, password, name);
  } else {
    return login(email, password);
  }
}