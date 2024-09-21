import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import StatCard from "../components/StatCard";
import HeaderDashboard from "../components/HeaderDashboard";
import Wrapper from "../assets/wrappers/StatsContainer";
import StackChart from "../components/StackChart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const tabs = [
  { id: 1, title: "Mahasiswa", url: "mahasiswa" },
  { id: 2, title: "Orang Tua", url: "orangtua" },
];

export const loader = async () => {
  try {
    const response = await customFetch.get("/mahasiswa/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Beranda = () => {
  const storedTab = JSON.parse(sessionStorage.getItem("activeTab"));
  const initialTab = storedTab?.tab ? storedTab?.tab : "mahasiswa";
  const currnetTab = storedTab?.id ? storedTab?.id : tabs[0].id;

  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(currnetTab);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get(`/${initialTab}/stats`);
        setData(response.data);
      } catch (error) {
        toast.error("Gagal memuat data data.");
      }
    };
    fetchData();
  }, [activeTab]);

  const { defaultStats, graphData } = data || {};
  const { ALL, JTI, JTIN, AKTP } = defaultStats || {};

  return (
    <>
      {/* <StatCard /> */}
      <HeaderDashboard
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Wrapper>
        <StatCard data={ALL} label="Keseluruhan" color="#41bc82" />
        {initialTab === "mahasiswa" && (
          <>
            <StatCard data={JTI} label="JTI" color="#41bc82" />
            <StatCard data={JTIN} label="JTIN" color="#41bc82" />
            <StatCard data={AKTP} label="AKTP" color="#41bc82" />
          </>
        )}
      </Wrapper>
      <StackChart data={graphData} />
    </>
  );
};

export default Beranda;
