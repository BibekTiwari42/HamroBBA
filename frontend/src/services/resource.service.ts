import api from "./api";

export const getResources = async (
  page = 1
) => {
  const response =
    await api.get(
      `/resources/?page=${page}`
    );

  return response.data;
};