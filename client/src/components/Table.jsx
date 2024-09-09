import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";
import TabelContainer from "../assets/wrappers/Tabel";
import { useDashboardContext } from "../pages/DashboardLayout";
import { getMahasiswaColumns, getOrangtuaColumns } from "../utils/columns";
import { BiExport } from "react-icons/bi";
import customFetch from "../utils/customFetch";

export const checkDefaultTheme = () => {
  const isDarkThemes = localStorage.getItem("darkTheme") === "true";
  return isDarkThemes === true ? "dark" : "default";
};

const Table = ({ titleTable, context }) => {
  const { isDarkTheme } = useDashboardContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const { data, total } = context;

  let columns,
    linkUrl = "";

  if (pathname.includes("/mahasiswa")) {
    columns = getMahasiswaColumns(navigate);
    linkUrl = "mahasiswa";
  } else if (pathname.includes("/orangtua")) {
    columns = getOrangtuaColumns(navigate);
    linkUrl = "orangtua";
  }

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

  const handleExportPDF = async () => {
    try {
      const response = await await customFetch.get(`${linkUrl}/export`, {
        headers: {
          "Content-Type": "application/pdf",
        },
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
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
        actions={
          <button
            type="button"
            className="btn"
            style={{
              display: "flex",
              alignIttems: "center",
              justifyContent: "center",
            }}
            onClick={handleExportPDF}
          >
            <BiExport size={15} style={{ marginRight: "0.3rem" }} /> Export PDF
          </button>
        }
      />
    </TabelContainer>
  );
};

export default Table;
