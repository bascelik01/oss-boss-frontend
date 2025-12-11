import api from "./apiConfig.js";

export const getAllCategories = async () => {
    try {
        const resp = await api.get("/categories/");
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const resp = await api.get(`/categories/${id}/`);
        return resp.data;
    } catch (error) {
        throw error;
    }
};
