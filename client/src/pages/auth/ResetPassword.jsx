import { Form, Link, redirect } from "react-router-dom";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../../components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request, params  }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { token } = params; 

  try {
    const response = await customFetch.post(
      `/auth/reset-password/${token}`,
      data
    );
    toast.success(response.data.message);
    return redirect("/login");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

const ResetPassword = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo width={250} />
        <h4>Masukkan Password Baru</h4>
        <FormRow type="password" name="password" labelText={"Password Baru"} />
        <SubmitBtn formBtn />
        <p>
          <Link to="/login" className="member-btn">
            Login!
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default ResetPassword;
