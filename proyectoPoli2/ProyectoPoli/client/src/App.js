import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FirebaseDatabaseProvider } from "@react-firebase/database";

import "./App.css";

import { ChangePageContext, SetSettingPageContext } from "./utils.js";
import { AuthProvider } from "./context/AuthContext";

import Page from "./Page.jsx";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [settingPage, setSettingPage] = useState("");

  function changePage(pagina) {
    setPage(pagina);
  }

  return (
    <FirebaseDatabaseProvider>
      <ChangePageContext.Provider value={changePage}>
        <SetSettingPageContext.Provider value={setSettingPage}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/"
                    element={<Page page={page} settingPage={settingPage} />}
                  ></Route>
                </Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </SetSettingPageContext.Provider>
      </ChangePageContext.Provider>
    </FirebaseDatabaseProvider>
  );
}
