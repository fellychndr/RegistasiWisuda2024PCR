import TabelContainer from "../../assets/wrappers/Tabel";
import { useDashboardContext } from "../DashboardLayout";
import Wrapper from "../../assets/wrappers/FormPage";
import { FormRow, SubmitBtn } from "../../components";
import { Form } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import ActionRequestResetPassword from "../../components/ActionRequestResetPassword";
import Meja from "./Meja";
import ActivationFeatures from "./ActivationFeature";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };

  try {
    const response = await customFetch.post("/auth/request-reset-password", {
      email: data.email,
    });
    toast.success(response.data.message);
  } catch (error) {
    errors.msg = error?.response?.data?.msg || "Terjadi kesalahan.";
    toast.error(errors.msg);
    return errors;
  }
};

const Settings = () => {
  const { user } = useDashboardContext();

  return (
    <TabelContainer>
      <ActivationFeatures />
      <hr />
      <Wrapper>
        <Form method="post" className="form">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="form-title">Profil</h4>
            <div className="sejajar">
              <button
                type="button"
                className="btn sejajar"
                onClick={() => ActionRequestResetPassword({ data: user })}
              >
                Reset Password!
              </button>
            </div>
          </div>

          <div className="form-center">
            <FormRow
              labelText="Nama"
              type="text"
              name="name"
              defaultValue={user.name}
            />
            <FormRow
              type="text"
              labelText="Email"
              name="email"
              defaultValue={user.email}
            />
            <FormRow
              type="text"
              labelText="Username"
              name="username"
              defaultValue={user.username}
            />
            <SubmitBtn formBtn />
          </div>
        </Form>
      </Wrapper>
      <hr />
      <Meja />
    </TabelContainer>
  );
};

export default Settings;
