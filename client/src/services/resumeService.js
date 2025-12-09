import api from './api';

export const saveResume = async (data) => {
    const response = await api.post('/api/resume/save', data);
    return response.data;
};

export const getResume = async () => {
    const response = await api.get('/api/resume');
    return response.data;
};
