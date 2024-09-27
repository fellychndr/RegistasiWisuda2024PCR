import Wrapper from "../assets/wrappers/FormPage";
import { useLoaderData } from "react-router-dom";

import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import FormTambahEdit from "../components/FormTambahEdit";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/users/admin/all-users/${params.id}`
    );
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/admin/all-users");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/users/admin/all-users/${params.id}`, data);
    toast.success("User berhasil di edit");
    return redirect("/dashboard/admin/all-users");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditUser = () => {
  const { data } = useLoaderData();
  return (
    <Wrapper>
      <FormTambahEdit title="Data User" action="Edit" data={data} />
    </Wrapper>
  );
};
export default EditUser;
