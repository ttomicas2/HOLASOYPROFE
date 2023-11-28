import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  logout();
  navigate("/");
}

export default Logout;
