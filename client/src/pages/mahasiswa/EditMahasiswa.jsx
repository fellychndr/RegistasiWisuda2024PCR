import Wrapper from "../../assets/wrappers/FormPage";
import { useLoaderData } from "react-router-dom";

import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import FormTambahEdit from "../../components/FormTambahEdit";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/mahasiswa/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/mahasiswa");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/mahasiswa/${params.id}`, data);
    toast.success("Mahasiswa berhasil di edit");
    return redirect("/dashboard/mahasiswa");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditMahasiswa = () => {
  const { mahasiswa } = useLoaderData();

  return (
    <Wrapper>
      <FormTambahEdit title="Edit Mahasiswa" mahasiswa={mahasiswa} />
    </Wrapper>
  );
};
export default EditMahasiswa;
