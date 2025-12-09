import api from './api';

export const getAllMentors = async () => {
    const response = await api.get('/api/mentors');
    return response.data;
};

export const registerAsMentor = async (data) => {
    const response = await api.post('/api/mentors/register', data);
    return response.data;
};

export const connectToMentor = async (data) => {
    // data: { mentorId, message }
    const response = await api.post('/api/mentors/connect', data);
    return response.data;
};
