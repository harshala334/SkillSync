import api from './api';

export const getAllProjects = async () => {
    const response = await api.get('/api/projects');
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await api.post('/api/projects', projectData);
    return response.data;
};

export const joinProject = async (projectId) => {
    const response = await api.post(`/api/projects/${projectId}/join`);
    return response.data;
};

export const getProjectTeammates = async (projectId) => {
    const response = await api.get(`/api/projects/${projectId}/teammates`);
    return response.data;
};
