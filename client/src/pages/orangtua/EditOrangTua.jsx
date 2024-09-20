import Wrapper from "../../assets/wrappers/FormPage";
import { useLoaderData } from "react-router-dom";

import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import FormTambahEdit from "../../components/FormTambahEdit";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/orangtua/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/orangtua");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/orangtua/${params.id}`, data);
    toast.success("OrangTua berhasil di edit");
    return redirect("/dashboard/orangtua");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditOrangTua = () => {
  const { orangtua } = useLoaderData();
  console.log(orangtua);
  

  return (
    <Wrapper>
      <FormTambahEdit title="Data Orangtua" action="Edit" data={orangtua} />
    </Wrapper>
  );
};
export default EditOrangTua;
