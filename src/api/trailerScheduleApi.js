import { api, unwrap } from "./apiClient";

const trailerScheduleApi = {
  getPublicSchedule: async (startDate, endDate) => {
    const res = await api.get("/MeaFTPublic/schedule", {
      params: { startDate, endDate },
    });
    return unwrap(res.data) || [];
  },

  requestDate: async (payload) => {
    const res = await api.post("/MeaFTPublic/request-date", payload);
    return res.data;
  },
};

export default trailerScheduleApi;