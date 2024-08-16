import TabelContainer from "../assets/wrappers/Tabel";
import { useDashboardContext } from "./DashboardLayout";
import Wrapper from "../assets/wrappers/FormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import ActionRequestResetPassword from "../components/ActionRequestResetPassword";
import { JURUSAN } from "../../../utils/constants";
import { checkDefaultTheme } from "../components/Table";
import DataTable from "react-data-table-component";



export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };

  try {
    const response = await customFetch.post(
      "/auth/request-reset-password",
      data.email
    );
    toast.success(response.data.message);
  } catch (error) {
    errors.msg = error?.response?.data?.msg;
    toast.error(errors.msg);
    return errors;
  }
};

const columns = [
  {
    name: "No.",
    selector: (row) => row.number,
    width: "3.4rem",
  },
  {
    name: "Nama Jurusan",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Nama Program Prodi",
    selector: (row) => row.prodi,
    sortable: true,
  },
];
const data = [
  {
    number: 1,
    name: "JTI",
    prodi: "D4 Teknik Informatika",
  },
  {
    number: 2,
    name: "JTI",
    prodi: "D4 Teknik Informatika",
  },
  {
    number: 3,
    name: "JTI",
    prodi: "D4 Teknik Informatika",
  },
  {
    number: 4,
    name: "JTI",
    prodi: "D4 Teknik Informatika",
  },
];

const Settings = () => {
  const { user } = useDashboardContext();

  return (
    <TabelContainer>
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
      <Wrapper>
        <Form method="post" className="form">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="form-title">Jurusan dan Prodi</h4>
          </div>

          <div className="form-center">
            <FormRowSelect
              labelText="Jurusan"
              name="jurusan"
              defaultValue={"mahasiswa.jurusan"}
              list={Object.values(JURUSAN)}
            />
            <FormRow
              type="text"
              labelText="Prodi"
              name="username"
              defaultValue={""}
            />
            <SubmitBtn formBtn />
          </div>

          <div>
            <TabelContainer>
              <DataTable
                columns={columns}
                data={data}
                title={"Jurusan dan Prodi"}
                pagination
                paginationServer
                // paginationTotalRows={total}
                // onChangePage={handlePageChange}
                // onChangeRowsPerPage={handlePerRowsChange}
                fixedHeader
                theme={checkDefaultTheme()}
                highlightOnHover
              />
            </TabelContainer>
          </div>
        </Form>
      </Wrapper>
    </TabelContainer>
  );
};

export default Settings;
