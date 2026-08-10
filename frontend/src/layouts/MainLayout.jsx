import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar name="Meet" role="jobseeker" />
      <Outlet />
    </>
  );
}

export default MainLayout;