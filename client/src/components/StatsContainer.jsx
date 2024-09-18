import Wrapper from "../assets/wrappers/StatsContainer";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "Seluruh Mahasiswa Unregistered",
      count: defaultStats?.ALLUNREGISTERED || 0,
      icon: <IoCloseCircle />,
      color: "#d66a6a",
      bcg: "#ffeeee",
      link: "mahasiswa",
    },
    {
      title: "Mahasiswa JTI",
      count: defaultStats?.UNJTI || 0,
      icon: <IoCloseCircle />,
      color: "#d66a6a",
      bcg: "#ffeeee",
      link: "mahasiswa?jurusan=JTI",
    },
    {
      title: "Mahasiswa JTIN",
      count: defaultStats?.UNJTIN || 0,
      icon: <IoCloseCircle />,
      color: "#d66a6a",
      bcg: "#ffeeee",
      link: "mahasiswa?jurusan=JTIN",
    },
    {
      title: "Mahasiswa AKTP",
      count: defaultStats?.UNAKTP || 0,
      icon: <IoCloseCircle />,
      color: "#d66a6a",
      bcg: "#ffeeee",
      link: "mahasiswa?jurusan=AKTP",
    },
    {
      title: "Seluruh Mahasiswa Registered",
      count: defaultStats?.ALLREGISTERED || 0,
      icon: <FaCheckCircle size={30} />,
      color: "#1d955d",
      bcg: "#daf2e7",
      link: "mahasiswa?isRegis=true",
    },
    {
      title: "Mahasiswa JTI",
      count: defaultStats?.JTI || 0,
      icon: <FaCheckCircle size={30} />,
      color: "#1d955d",
      bcg: "#daf2e7",
      link: "mahasiswa?isRegis=true&jurusan=JTI",
    },
    {
      title: "Mahasiswa JTIN",
      count: defaultStats?.JTIN || 0,
      icon: <FaCheckCircle size={30} />,
      color: "#1d955d",
      bcg: "#daf2e7",
      link: "mahasiswa?isRegis=true&jurusan=JTIN",
    },
    {
      title: "Mahasiswa AKTP",
      count: defaultStats?.AKTP || 0,
      icon: <FaCheckCircle size={30} />,
      color: "#1d955d",
      bcg: "#daf2e7",
      link: "mahasiswa?isRegis=true&jurusan=AKTP",
    },
    // {
    //   title: "All Mahasiswa a",
    //   count: defaultStats?.pending || 0,
    //   icon: <FaSuitcaseRolling />,
    //   color: "#f59e0b",
    //   bcg: "#fef3c7",
    // },
    // {
    //   title: "Mahasiswa Registered a",
    //   count: defaultStats?.interview || 0,
    //   icon: <FaCalendarCheck />,
    //   color: "#647acb",
    //   bcg: "#e0e8f9",
    // },
    // {
    //   title: "Mahasiswa Unregistered a",
    //   count: defaultStats?.declined || 0,
    //   icon: <FaBug />,
    //   color: "#d66a6a",
    //   bcg: "#ffeeee",
    // },
  ];
  return (
    <Wrapper>
      {stats.map((item, i) => {
        return <StatItem key={i} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
