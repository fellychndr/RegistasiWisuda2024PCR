import Wrapper from "../../assets/wrappers/FormPage";
import { useLoaderData } from "react-router-dom";

import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import FormTambahEdit from "../../components/FormTambahEdit";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/settings/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/settings");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/settings/${params.id}`, data);
    toast.success("Setting berhasil di edit");
    return redirect("/dashboard/settings");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditSettings = () => {
  const { settings } = useLoaderData();

  return (
    <Wrapper>
      <FormTambahEdit title="Data Setting" action={"Edit"} data={settings} />
    </Wrapper>
  );
};
export default EditSettings;
