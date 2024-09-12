import customFetch from "../utils/customFetch";

export const getAllSettings = async () => {
  try {
    const response = await customFetch.get("/settings");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getSetting = async ({ id }) => {
  try {
    const response = await customFetch.get(`/settings/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSetting = async (data) => {
  try {
    const response = await customFetch.post("/settings/", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
