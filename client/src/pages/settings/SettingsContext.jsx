import { createContext, useState, useEffect, useContext } from "react";
import customFetch from "../../utils/customFetch";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("featureNames"));
    if (savedSettings) {
      setSettings(savedSettings);
    } else {
      fetchSettings();
    }
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await customFetch.get("/settings");
      
      const featureNames = {};
      response.data.data.forEach((setting) => {
        featureNames[setting.featureName] = setting.isEnabled;
      });
      setSettings(featureNames);
      localStorage.setItem("featureNames", JSON.stringify(featureNames));
    } catch (error) {
      console.error("Gagal mengambil data settings:", error);
    }
  };


  const updateSetting = (featureName, value) => {
    const updatedSettings = { ...settings, [featureName]: value };
    setSettings(updatedSettings);
    localStorage.setItem("featureNames", JSON.stringify(updatedSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};
