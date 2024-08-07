import { IoBarChartSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

import { PiStudentBold } from "react-icons/pi";
import { FiHome } from "react-icons/fi";
import { SlPeople } from "react-icons/sl";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const links = [
  { text: "Beranda", path: ".", icon: <FiHome /> },
  { text: "Mahasiswa", path: "mahasiswa", icon: <PiStudentBold /> },
  { text: "Orang Tua", path: "orangtua", icon: <SlPeople /> },
  { text: "Scan", path: "scan", icon: <MdOutlineQrCodeScanner /> },
  { text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
];
export default links;
