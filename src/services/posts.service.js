import api from "./api"; // axios instance

// Create Post
export const createPost = async (data) => {
    try {
        const res = await api.post("/posts", data);
        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};

// Get All Posts
export const getAllPosts = async () => {
    try {
        const res = await api.get("/posts");
        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};

// Get Single Post by ID
export const getPostById = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};

// Update Post
export const updatePost = async (id, data) => {
    try {
        const res = await api.put(`/posts/${id}`, data);
        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};

// Delete Post
export const deletePost = async (id) => {
    try {
        const res = await api.delete(`/posts/${id}`);
        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};
