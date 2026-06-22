import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased from 10000ms to 30000ms
});

// Add interceptor to include token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response error interceptor to handle timeouts silently
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Suppress timeout errors from being displayed to user
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      console.error("Request timeout:", error.message);
      // Return a rejected promise without the timeout message to prevent UI display
      return Promise.reject({
        ...error,
        message: "", // Clear the error message so it won't display
        isTimedOut: true,
      });
    }
    return Promise.reject(error);
  },
);

// Abstract services
export const abstractService = {
  submitAbstract: (formData) =>
    api.post("/abstracts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getAbstracts: () => api.get("/abstracts"),
  getAbstractById: (id) => api.get(`/abstracts/${id}`),
  getAbstractBySubmissionId: (submissionId) =>
    api.get(`/abstracts/submission/${submissionId}`),
  updateAbstractStatus: (id, status) =>
    api.put(`/abstracts/${id}/status`, { status }),
};

// Registration services
export const registrationService = {
  createRegistration: (data) => api.post("/registrations", data),
  getRegistrations: () => api.get("/registrations"),
  getRegistrationById: (id) => api.get(`/registrations/${id}`),
  getRegistrationByRegistrationId: (registrationId) =>
    api.get(`/registrations/registration/${registrationId}`),
  updatePaymentStatus: (id, paymentStatus) =>
    api.put(`/registrations/${id}/payment`, { paymentStatus }),
};

// Admin auth services
export const adminAuthService = {
  login: (email, password) =>
    api.post("/admin/auth/login", { email, password }),
  register: (username, email, password) =>
    api.post("/admin/auth/register", { username, email, password }),
};

// Admin dashboard services
export const adminDashboardService = {
  getAllAbstracts: () => api.get("/admin/dashboard/abstracts"),
  getAbstractDetails: (id) => api.get(`/admin/dashboard/abstracts/${id}`),
  exportToExcel: () => {
    const token = localStorage.getItem("adminToken");
    return axios.get(`${API_BASE_URL}/admin/dashboard/export/excel`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });
  },
  exportToPDF: () => {
    const token = localStorage.getItem("adminToken");
    return axios.get(`${API_BASE_URL}/admin/dashboard/export/pdf`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });
  },
  deleteAbstract: (id) => api.delete(`/admin/dashboard/abstracts/${id}`),
  getAllRegistrations: () => api.get("/admin/dashboard/registrations"),
  deleteRegistration: (id) =>
    api.delete(`/admin/dashboard/registrations/${id}`),
  getRegistrations: () => api.get("/admin/dashboard/registrations"),
};

// Payment services
// Payment services
export const paymentService = {
  // Flutterwave payment endpoints
  initializePayment: (
    amount,
    registrationData,
    paymentPurpose = "registration",
    paymentMethod = "flutterwave",
  ) =>
    api.post(
      "/payments/initialize",
      { amount, registrationData, paymentPurpose, paymentMethod },
      { timeout: 15000 },
    ),

  verifyPayment: (
    txRef,
    registrationData,
    amount,
    paymentPurpose = "registration",
  ) =>
    api.post(
      "/payments/verify",
      { txRef, registrationData, amount, paymentPurpose },
      { timeout: 30000 },
    ),

  // Stripe payment endpoints
  createPaymentIntent: (
    amount,
    registrationData,
    paymentPurpose = "registration",
  ) =>
    api.post(
      "/payments/stripe/create-intent",
      { amount, registrationData, paymentPurpose },
      { timeout: 15000 },
    ),

  confirmStripePayment: (paymentIntentId, registrationData, amount) =>
    api.post(
      "/payments/stripe/confirm",
      { paymentIntentId, registrationData, amount },
      { timeout: 30000 },
    ),

  // Stripe Hosted Checkout endpoints (NEW)
  createCheckoutSession: (
    amount,
    registrationData,
    paymentPurpose = "registration",
  ) =>
    api.post(
      "/payments/stripe/checkout/create",
      { amount, registrationData, paymentPurpose },
      { timeout: 15000 },
    ),

  verifyCheckoutSession: (sessionId, registrationData, amount) =>
    api.post(
      "/payments/stripe/checkout/verify",
      { sessionId, registrationData, amount },
      { timeout: 30000 },
    ),

  // PayPal legacy endpoints
  createOrder: (amount, registrationData, paymentPurpose = "registration") =>
    api.post(
      "/payments/create-order",
      { amount, registrationData, paymentPurpose },
      { timeout: 15000 },
    ),

  captureOrder: (
    orderId,
    registrationData,
    amount,
    paymentPurpose = "registration",
  ) =>
    api.post(
      "/payments/capture-order",
      { orderId, registrationData, amount, paymentPurpose },
      { timeout: 30000 },
    ),
};

export default api;
