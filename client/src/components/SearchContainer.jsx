import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, useNavigate } from "react-router-dom";
import { JURUSAN, PRODI, SORT_BY } from "../../../utils/constants";
import { useRef } from "react";
import { GrPowerReset } from "react-icons/gr";

const SearchContainer = ({ context, formTitle }) => {
  const { search, jurusan, prodi, sort, isRegis = false } = context;
  const formRef = useRef(null);
  const submit = useSubmit();
  const navigate = useNavigate();

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

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset(); // Reset the form fields
      // Optionally navigate to the base URL or current URL to refresh search results
      navigate(window.location.pathname);
    }
  };

  return (
    <Wrapper>
      <Form className="form" ref={formRef}>
        <h6 className="form-title">{formTitle}</h6>
        <div className="form-center">
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
          <div className="form-row">
            <br /> <br />
            <button
              type="button"
              onClick={resetForm}
              className="btn reset-btn "
            >
              <GrPowerReset size={15} />
            </button>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
