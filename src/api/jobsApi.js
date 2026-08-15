// src/api/jobsApi.js

import { api, unwrap } from "./apiClient";

const jobsApi = {
  // =====================================================
  // PUBLIC
  // =====================================================

  getActiveJobs: async () => {
    const res = await api.get("/MeaJobs");

    const data = unwrap(res.data);

    return Array.isArray(data)
      ? data
      : [];
  },

  getJob: async (jobPostingId) => {
    const res = await api.get(
      `/MeaJobs/${jobPostingId}`
    );

    return res.data;
  },

  submitApplication: async (
    jobPostingId,
    application
  ) => {
    const formData = new FormData();

    appendIfValue(
      formData,
      "FirstName",
      application.firstName
    );

    appendIfValue(
      formData,
      "LastName",
      application.lastName
    );

    appendIfValue(
      formData,
      "Email",
      application.email
    );

    appendIfValue(
      formData,
      "Phone",
      application.phone
    );

    appendIfValue(
      formData,
      "PreferredContactMethod",
      application.preferredContactMethod
    );

    appendIfValue(
      formData,
      "AvailableStartDate",
      application.availableStartDate
    );

    appendIfValue(
      formData,
      "Availability",
      application.availability
    );

    appendIfValue(
      formData,
      "CurrentEmployer",
      application.currentEmployer
    );

    appendIfValue(
      formData,
      "CurrentPosition",
      application.currentPosition
    );

    appendIfValue(
      formData,
      "YearsExperience",
      application.yearsExperience
    );

    appendIfValue(
      formData,
      "AboutYourself",
      application.aboutYourself
    );

    appendIfValue(
      formData,
      "WhyWorkHere",
      application.whyWorkHere
    );

    appendIfValue(
      formData,
      "AdditionalComments",
      application.additionalComments
    );

    // Honeypot
    appendIfValue(
      formData,
      "Website",
      application.website
    );

    if (application.resume) {
      formData.append(
        "Resume",
        application.resume
      );
    }

    const res = await api.post(
      `/MeaJobs/${jobPostingId}/apply`,
      formData
    );

    return res.data;
  },
};

function appendIfValue(
  formData,
  key,
  value
) {
  if (
    value !== undefined &&
    value !== null &&
    value !== ""
  ) {
    formData.append(key, value);
  }
}

export default jobsApi;