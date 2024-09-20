import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  const location = useLocation();

  let pathParts = location.pathname.split("/");
  let pathName = pathParts[2] ? pathParts[2] : pathParts[1];
  pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <Wrapper style={{ zIndex: 10 }}>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h4 className="logo-text">{pathName}</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
