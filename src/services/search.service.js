export const searchQuery = async (query) => {
  try {
    const res = await api.get("/Search", {
      params: { q: query },
    });
    return res.data;
  } catch (err) {
    throw err.message;
  }
};
