const API_BASE = "/api/v1";

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  const token = localStorage.getItem("eduguard_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.body && typeof config.body !== "string" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
    config.headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, config);

  if (res.status === 401) {
    localStorage.removeItem("eduguard_token");
  }

  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}`;
    try {
      const err = await res.json();
      errorMsg = err.detail || err.message || errorMsg;
    } catch (_) {}
    throw new Error(errorMsg);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await res.json();
  }
  return await res.text();
}

export const api = {
  auth: {
    login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),
    demoLogin: (role = "lecturer") => request(`/auth/demo-login?role=${encodeURIComponent(role)}`, { method: "POST" }),
    register: (data) => request("/auth/register", { method: "POST", body: data }),
    me: () => request("/auth/me", { method: "GET" }),
    logout: () => {
      localStorage.removeItem("eduguard_token");
    },
    setToken: (token) => localStorage.setItem("eduguard_token", token),
  },

  courses: {
    list: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/courses${qs ? `?${qs}` : ""}`);
    },
    get: (id) => request(`/courses/${id}`),
    create: (data) => request("/courses", { method: "POST", body: data }),
  },

  assignments: {
    list: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/assignments${qs ? `?${qs}` : ""}`);
    },
    get: (id) => request(`/assignments/${id}`),
    create: (data) => request("/assignments", { method: "POST", body: data }),
  },

  rubrics: {
    list: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/rubrics${qs ? `?${qs}` : ""}`);
    },
    get: (id) => request(`/rubrics/${id}`),
    create: (data) => request("/rubrics", { method: "POST", body: data }),
  },

  submissions: {
    list: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/submissions${qs ? `?${qs}` : ""}`);
    },
    get: (id) => request(`/submissions/${id}`),
    create: (data) => request("/submissions", { method: "POST", body: data }),
    runAssessment: (id) => request(`/submissions/${id}/run-ai-assessment`, { method: "POST" }),
    review: (id, data) => request(`/submissions/${id}/review`, { method: "POST", body: data }),
    updateStatus: (id, data) => request(`/submissions/${id}/status`, { method: "PATCH", body: data }),
  },

  analytics: {
    dashboard: (courseId = null) => request(
      `/analytics/dashboard${courseId ? `?course_id=${courseId}` : ""}`
    ),
    student: (studentId) => request(`/analytics/student/${studentId}`),
  },

  users: {
    list: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/users${qs ? `?${qs}` : ""}`);
    },
    me: () => request("/users/me"),
    get: (id) => request(`/users/${id}`),
    updateMe: (data) => request("/users/me", { method: "PATCH", body: data }),
    courseStudents: (courseId) => request(`/users/course/${courseId}/students`),
  },

  health: async () => {
    try {
      const res = await fetch("/health");
      return res.ok ? await res.json() : { status: "offline" };
    } catch (_) {
      return { status: "offline" };
    }
  },
};

export default api;
