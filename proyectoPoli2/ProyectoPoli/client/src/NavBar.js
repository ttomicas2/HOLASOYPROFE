import "./NavBar.css";
import * as Icon from "react-bootstrap-icons";
import { useVh } from "./utils.js";
import { ReactComponent as Logo } from "./images/logo.svg";
import { useState, useEffect, useRef, useContext } from "react";
import { ChangePageContext, SetSettingPageContext } from "./utils.js";

import rojo from "./images/rojo.jpg";

const usuario = {nombre: "Tadeo Lucas Centrone", 
                 mail: "alumno24.centrone.tadeo@ipm.edu.ar",
                 foto: rojo
                }

export function NavBar() {
  const vh = useVh();
const changePage = useContext(ChangePageContext);
  return (
    <header id="nav" className="navbar navbar-expand-lg color-principal sticky-top">
      <div className="container-fluid">
        <Logo height={6 * vh} width={6 * vh} onClick={() => changePage("home")}/> 
        <Profile foto={usuario.foto} />
      </div>
    </header>
  );
}

function Profile({ foto }) {
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef(null);
  const vh = useVh();

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  if(!dropDown){
    return(
    <div className="text-align-left">
      { foto === null ?
        <Icon.PersonCircle onClick={() => setDropDown(true)} color="white" height={6*vh} width={6*vh} />
        :
        <img style={{borderRadius: "100%"}} onClick={() => setDropDown(true)} src={foto} alt="foto de perfil" height={6*vh} width={6*vh}/>
      }
    </div>
  );
  }
  return(
    <div ref={ref} >
    <Desplegable setDropDown={setDropDown} foto={foto} />
    </div>
  );
}

function Desplegable({ foto, setDropDown }){
  const vh = useVh();
  const changePage = useContext(ChangePageContext);
  const setSettingPage = useContext(SetSettingPageContext);
  return(
    <>
    { foto !== null ? 
    <div className="usuario-dropdown">
      <div className="usuario">
        <div className="foto">
          <img src={foto} alt="foto de perfil" width={6*vh} height={6*vh} style={{borderRadius: "100%"}}/>
        </div>
        <div className="info-usuario">
          <div className="nombre-usuario">{usuario.nombre}</div>
          <div className="mail-usuario">{usuario.mail}</div>
        </div>
      </div>
      <ul>
        <li className="divisor"></li>
        <li className="usuario-li" onClick={() => {
          changePage("setting");
          setSettingPage("cuenta");
          setDropDown(false);
        }}>Administrar cuenta</li>
        <li className="divisor"></li>
        <li className="usuario-li">
          <a href="/logout">Cerrar sesión</a>
        </li>
      </ul>
      </div>
      : 
    <div className="usuario-dropdown">
      <div className="usuario">
        <div className="foto">
         <Icon.PersonCircle color="#000" height={6*vh} width={6*vh} />
        </div>
      </div>
      <ul>
        <li className="divisor"></li>
        <li className="usuario-li">Iniciar sesión</li>
      </ul>
    </div>
    }
    </>
  );
}