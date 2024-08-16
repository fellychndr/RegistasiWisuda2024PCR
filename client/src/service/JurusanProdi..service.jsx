import customFetch from "../utils/customFetch";

export const getAllJurusanProdi = async () => {
  try {
    const response = await customFetch.get("/jurusan");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
