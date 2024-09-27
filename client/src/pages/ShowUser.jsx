import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import TabelContainer from "../assets/wrappers/Tabel";
import { Table } from "../components";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/users/admin/all-users", {
      params,
    });
    return { data };
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const ShowUser = () => {
  const { data } = useLoaderData();
  return (
    <TabelContainer>
      {/* <LabelButton title="Admin"></LabelButton> */}
      <h5 className="label">Tabel Users</h5>
      <Table titleTable={"Seluruh Users"} context={data} />
    </TabelContainer>
  );
};

export default ShowUser;
