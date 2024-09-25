import customFetch from "../utils/customFetch";

export const getAllMeja = async () => {
  try {
    const response = await customFetch.get("/settings/meja");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createMeja = async (data) => {
  try {
    const response = await customFetch.post("/settings/meja", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMeja = async (id) => {
  try {
    const response = await customFetch.get(`/settings/meja/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMeja = async (id, data) => {
  try {
    const response = await customFetch.patch(`/settings/meja/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMeja = async (id) => {
  try {
    const response = await customFetch.delete(`/settings/meja/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
