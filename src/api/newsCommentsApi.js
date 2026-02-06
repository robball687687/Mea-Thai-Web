import { api, unwrap } from "./apiClient";

const newsCommentsApi = {
  getApprovedByPost: async (blogPostId) => {
    const res = await api.get(`/BlogComments/GetApprovedByPost/${blogPostId}`);
    return unwrap(res.data) || [];
  },

  create: async (payload) => {
    const res = await api.post("/BlogComments/Create", payload);
    return res.data;
  },
};

export default newsCommentsApi;
