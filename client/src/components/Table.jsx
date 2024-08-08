import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";
import TabelContainer from "../assets/wrappers/Tabel";
import { useDashboardContext } from "../pages/DashboardLayout";
import { getMahasiswaColumns } from "../utils/columns";

export const checkDefaultTheme = () => {
  const isDarkThemes = localStorage.getItem("darkTheme") === "true";
  return isDarkThemes === true ? "dark" : "default";
};

const Table = ({ titleTable, context }) => {
  const { isDarkTheme } = useDashboardContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const { data, total } = context;

  const columns = getMahasiswaColumns(navigate);

  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", page);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handlePerRowsChange = (limit) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("limit", limit);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <TabelContainer>
      <DataTable
        columns={columns}
        data={data}
        title={titleTable}
        pagination
        paginationServer
        paginationTotalRows={total}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        fixedHeader
        theme={checkDefaultTheme()}
        highlightOnHover
        // actions={
        //   <button
        //     type="button"
        //     className="btn"
        //     style={{
        //       display: "flex",
        //       alignIttems: "center",
        //       justifyContent: "center",
        //     }}
        //   >
        //     <BiExport size={15} style={{ marginRight: "0.3rem" }} /> Export PDF
        //   </button>
        // }
      />
    </TabelContainer>
  );
};

export default Table;
