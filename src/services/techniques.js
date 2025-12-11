import api from "./apiConfig.js";

export const getAllTechniques = async () => {
    try {
        const resp = await api.get("/techniques/");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getTechniqueById = async (id) => {
    try {
        const resp = await api.get(`/techniques/${id}/`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const createTechnique = async (techniqueData) => {
    try {
        const resp = await api.post("/techniques/", techniqueData);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const updateTechnique = async (id, techniqueData) => {
    try {
        const resp = await api.put(`/techniques/${id}/`, techniqueData);
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTechnique = async (id) => {
    try {
        const resp = await api.delete(`/techniques/${id}/`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
