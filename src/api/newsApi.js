import { api, unwrap } from "./apiClient";

const newsApi = {
  getLatest: async (take = 5) => {
    const res = await api.get("/Blog/GetPublished", { params: { take } });
    return unwrap(res.data) || [];
  },

  getBySlug: async (slug) => {
    const res = await api.get(
      `/Blog/GetBySlug/${encodeURIComponent(slug)}`
    );
    return res.data;
  },
};

export default newsApi;
