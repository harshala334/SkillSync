import api from './api';

export const getProfile = async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await api.put('/api/users/profile', data);
    return response.data;
};

export const getLeaderboard = async () => {
    const response = await api.get('/api/users/leaderboard');
    return response.data;
};
