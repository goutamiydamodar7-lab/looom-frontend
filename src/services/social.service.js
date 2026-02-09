import api from "./api";

// Like a Post
export const likePost = async (postId) => {
    try {
        const res = await api.post(`/posts/${postId}/like`);
        return res.data;
    } catch (err) {
        console.error(err);
        return err.response?.data;
    }
};

// Unlike a Post
export const unlikePost = async (postId) => {
    try {
        const res = await api.post(`/posts/${postId}/unlike`);
        return res.data;
    } catch (err) {
        console.error(err);
        return err.response?.data;
    }
};

// Add Comment
export const addComment = async (postId, data) => {
    try {
        const res = await api.post(`/posts/${postId}/comment`, data);
        return res.data;
    } catch (err) {
        console.error(err);
        return err.response?.data;
    }
};

// Delete Comment
export const deleteComment = async (postId, commentId) => {
    try {
        const res = await api.delete(
            `/posts/${postId}/comment/${commentId}`
        );
        return res.data;
    } catch (err) {
        console.error(err);
        return err.response?.data;
    }
};

// Follow User
export const followUser = async (userId) => {
    try {
        const res = await api.post(`/users/${userId}/follow`);
        return res.data;
    } catch (err) {
        console.error(err);
        return err.response?.data;
    }
};

// Unfollow User
export const unfollowUser = async (userId) => {
    try {
        const res = await api.post(`/users/${userId}/unfollow`);
        return res.data;
    } catch (err) {
        console.error(err);
        return err.response?.data;
    }
};
