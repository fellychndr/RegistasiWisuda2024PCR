import { useState } from "react";
import customFetch from "../utils/customFetch";

const ToggleButton = ({ id, isEnabled }) => {
  const [isOn, setIsOn] = useState(isEnabled);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    handleToggle(id);
  };

  const handleToggle = async (id) => {
    try {
      const data = { isEnabled: !isOn };
      const response = await customFetch.patch(`/settings/${id}`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
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
