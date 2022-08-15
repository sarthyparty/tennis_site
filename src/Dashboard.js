import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./firebase";

function Dashboard(props) {;
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
//   let email = localStorage.getItem("email");
//   if (email == "null" || email == null) {
//     return <Navigate to={"/login"}/>
//   }
  
  const handleLogout = () => {
    logout()
    navigate("/login");
  };

  const create = () => {
    navigate("/admin/create");
  };

  const goDash = () => {
    navigate("/admin");
  };

  const emails = () => {
    navigate("/admin/emails");
  };

  const files = () => {
    navigate("/admin/files");
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div>
      <div class="dashboard">
        <input type="button" onClick={handleLogout} value="Logout" />
        <input type="button" onClick={create} value="New Post" />
        <input type="button" onClick={goDash} value="Posts" />
        <input type="button" onClick={emails} value="Emails" />
        <input type="button" onClick={files} value="Files" />
      </div>
      <br/>
      <Outlet />
    </div>
  );
}

export default Dashboard;