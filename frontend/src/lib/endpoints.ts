export const endpoints = {
  academics: {
    semesters: "/academics/semesters/",
    subjects: "/academics/subjects/",
  },
  resources: {
    list: "/resources/",
    view: (id: number) => `/resources/view/${id}/`,
    download: (id: number) => `/resources/download/${id}/`,
  },
  auth: {
    login: "/auth/login/",
    me: "/auth/me/",
    refresh: "/auth/refresh/",
  },
  search: "/search/",
};