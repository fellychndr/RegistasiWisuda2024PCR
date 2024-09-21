import Wrapper from "../assets/wrappers/HeaderDashboard.js";
import { useState, useRef, useEffect } from "react";

const HeaderDashboard = ({ tabs, activeTab, setActiveTab }) => {
  const [tabStyle, setTabStyle] = useState({});

  const tabRef = useRef(null);

  useEffect(() => {
    if (tabRef.current) {
      const activeTabElement = tabRef.current.querySelector(".active");
      if (activeTabElement) {
        const newTabStyle = {
          left: activeTabElement.offsetLeft,
          width: activeTabElement.offsetWidth,
        };
        setTabStyle(newTabStyle);
      }
    }
  }, [activeTab]);

  const handleTabClick = (tabId, tabUrl) => {
    const newActiveTabElement = tabRef.current.querySelector(`#tab-${tabId}`);
    const newTabStyle = {
      left: newActiveTabElement.offsetLeft,
      width: newActiveTabElement.offsetWidth,
    };
    setTabStyle(newTabStyle);
    setActiveTab(tabId);

    sessionStorage.setItem(
      "activeTab",
      JSON.stringify({ id: tabId, tab: tabUrl })
    );
  };

  return (
    <Wrapper>
      <h5>Dashboard</h5>
      <div className="tabs-container">
        <div className="tabs" ref={tabRef}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id, tab.url)}
            >
              {tab.title}
            </div>
          ))}
          <div className="tab-slider" style={tabStyle}></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeaderDashboard;
