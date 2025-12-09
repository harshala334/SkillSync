import api from './api';

export const getTasks = async (projectId) => {
    const response = await api.get(`/api/tasks/${projectId}`);
    return response.data;
};

export const createTask = async (taskData) => {
    // taskData: { content, tag, priority, assignee, projectId }
    const response = await api.post('/api/tasks', taskData);
    return response.data;
};

export const reorderTasks = async (data) => {
    // data: { projectId, sourceColumnId, destinationColumnId, sourceTaskIds, destinationTaskIds }
    const response = await api.put('/api/tasks/reorder', data);
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await api.delete(`/api/tasks/${taskId}`);
    return response.data;
};
