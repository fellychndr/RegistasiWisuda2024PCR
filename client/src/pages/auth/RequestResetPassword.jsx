import { Form, Link, redirect } from "react-router-dom";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../../components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post(
      "/auth/request-reset-password",
      data
    );
    toast.success(response.data.message);
    return redirect("/login");
  } catch (error) {
    toast.error(error.data.message);
  }
};

const RequestResetPassword = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo width={250} />
        <h4>Reset Password</h4>
        <FormRow type="email" name="email" labelText={"Email"} />
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
export default RequestResetPassword;
