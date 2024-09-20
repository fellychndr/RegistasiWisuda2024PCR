import TabelContainer from "../../assets/wrappers/Tabel";
import Meja from "./Meja";
import ActivationFeatures from "./ActivationFeature";
import UserSettings from "./UserSettings";

const Settings = () => {
  return (
    <TabelContainer>
      <UserSettings />
      <hr />
      <ActivationFeatures />
      <hr />
      <Meja />
    </TabelContainer>
  );
};

export default Settings;
