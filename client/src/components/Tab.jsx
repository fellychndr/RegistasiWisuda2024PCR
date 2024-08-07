import { useState } from "react";
import TabWrapper from "../assets/wrappers/TabWrapper";
import tabs from "../utils/tab";
import { useLocation, useNavigate } from "react-router-dom";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = sessionStorage.getItem("activeTab");
    return storedTab !== null ? parseInt(storedTab, 10) : 0;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);

  const handleTabClick = (index, jurusan) => {
    setActiveTab(index);
    sessionStorage.setItem("activeTab", index.toString());
    searchParams.set("jurusan", jurusan);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  const jurusan = searchParams.get("jurusan");
  return (
    <div>
      <TabWrapper>
        {tabs.map((tab, index) => (
          <div
            className={`${
              index === activeTab 
              // || jurusan === tab.jurusan 
              ? "tab-active" : ""
            } tab-button`}
            key={index}
            onClick={() => handleTabClick(index, tab.jurusan)}
          >
            {tab.title}
          </div>
        ))}
      </TabWrapper>
    </div>
  );
};

export default Tab;
