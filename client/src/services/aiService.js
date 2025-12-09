import api from './api';

export const generateRoadmap = async (goal) => {
    const response = await api.post('/api/ai/generate', { goal });
    return response.data;
};
