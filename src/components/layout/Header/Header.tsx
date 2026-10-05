import type { Units } from "../../../features/settings/types/units.types";
import DropdownUnits from "../../ui/DropdownUnits/DropdownUnits";
import "./Header.css";
import logoIcon from "/images/logo.svg";

interface HeaderProps {
  units: Units;
  onChangeUnits: React.Dispatch<React.SetStateAction<Units>>;
}

const Header = ({ units, onChangeUnits }: HeaderProps) => {
  return (
    <header className="app-header">
      <a href="/" className="app-header__brand" aria-label="Weather Now home">
        <img src={logoIcon} alt="" className="app-header__logo" />
      </a>

      <DropdownUnits units={units} onChangeUnits={onChangeUnits} />
    </header>
  );
};

export default Header;
