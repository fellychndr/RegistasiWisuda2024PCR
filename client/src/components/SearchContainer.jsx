import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit } from "react-router-dom";
import { JURUSAN, PRODI, SORT_BY } from "../../../utils/constants";

const SearchContainer = ({ context, formTitle }) => {
  const { searchValues = {} } = context || {};
  const { search, jurusan, prodi, sort, isRegis = false } = searchValues;

  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 500);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h6 className="form-title">{formTitle}</h6>
        <div className="form-center">
          {/* search position */}

          <FormRow
            style={{ display: "none" }}
            type="hidden"
            name="isRegis"
            sembunyi={true}
            defaultValue={isRegis}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRow
            type="search"
            name="search"
            labelText="Search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="Jurusan"
            name="jurusan"
            list={["all", ...Object.values(JURUSAN)]}
            defaultValue={jurusan}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="Prodi"
            name="prodi"
            defaultValue={prodi}
            list={["all", ...Object.values(PRODI)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          {/* <Link
          to="/dashboard/mahasiswa"
          className="btn form-btn delete-btn"
          style={{ width: "100%" }}
        >
          Reset Search Values
        </Link> */}
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
