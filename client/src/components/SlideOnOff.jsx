import { useState } from "react";
import customFetch from "../utils/customFetch";
import { useSettingsContext } from "../pages/settings/SettingsContext";

const ToggleButton = ({ id, featureName, isEnabled }) => {
  const [isOn, setIsOn] = useState(isEnabled);
  const { updateSetting } = useSettingsContext();

  const toggleSwitch = async () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);

    try {
      await customFetch.patch(`/settings/${id}`, { isEnabled: newIsOn });
      updateSetting(featureName, newIsOn);
    } catch (error) {
      console.log("Error updating setting:", error);
    }
  };

  return (
    <div
      className={`toggle-button ${isOn ? "on" : "off"}`}
      onClick={toggleSwitch}
    >
      <div className="toggle-button-slider" />
    </div>
  );
};

export default ToggleButton;
