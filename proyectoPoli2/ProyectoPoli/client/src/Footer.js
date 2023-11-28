import { ReactComponent as Fridge } from "./images/fridge.svg";
import { ReactComponent as FridgeFill } from "./images/fridgeFill.svg";
import "./Footer.css";
import * as Icon from "react-bootstrap-icons";
import { useVh, ChangePageContext, SetSettingPageContext } from "./utils.js";
import { useContext } from "react";

export function Footer({ page }) {
  const vh = useVh();
  const handleClick = useContext(ChangePageContext);
  const setSettingPage = useContext(SetSettingPageContext);
  
  return (
    <div className="footer grid color-principal">
      <div
        className="footer-item heladera"
        onClick={() => {
          handleClick("heladera");
        }}
      >
        {page === "heladera" ? (
          <FridgeFill
            fill={"#ffffff"}
            stroke={"#ffffff"}
            height={7 * vh}
            width={6 * vh}
          />
        ) : (
          <Fridge
            fill={"#ffffff"}
            stroke={"#ffffff"}
            height={7 * vh}
            width={6 * vh}
          />
        )}
      </div>
      <div
        className="footer-item casa"
        onClick={() => {
          handleClick("home");
        }}
      >
        {page === "home" ? (
          <Icon.HouseDoorFill color="white" size={7 * vh} />
        ) : (
          <Icon.HouseDoor color="white" size={7 * vh} />
        )}
      </div>
      <div
        className="footer-item setting"
        onClick={() => {
          handleClick("setting");
          setSettingPage("");
        }}
      >
        {page === "setting" ? (
          <Icon.GearFill color="white" size={7 * vh} />
        ) : (
          <Icon.Gear color="white" size={7 * vh} />
        )}
      </div>
    </div>
  );
}
