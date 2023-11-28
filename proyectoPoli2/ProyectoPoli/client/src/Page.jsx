import { NavBar } from "./NavBar.js";
import { Footer } from "./Footer.js";
import {
  Home,
  Setting,
  Heladera,
  Recetas,
  Favs,
  Sorpresa,
  Calculadora,
} from "./MainPages.js";
function Page({ page, settingPage }) {
  return (
    <div className="App">
      <NavBar />
      {page === "home" && <Home />}
      {page === "recetas" && <Recetas />}
      {page === "favs" && <Favs />}
      {page === "sorpresa" && <Sorpresa />}
      {page === "calculadora" && <Calculadora />}
      {page === "setting" && <Setting settingPage={settingPage} />}
      {page === "heladera" && <Heladera miniatura={false} />}
      <Footer page={page} />
    </div>
  );
}

export default Page;
