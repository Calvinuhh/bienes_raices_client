import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";

const Layout = ({ showHeader }: { showHeader: boolean }) => {
  return (
    <div className=" min-h-screen bg-gray-50">
      {showHeader && <Header />}
      <div className=" mx-auto container mt-10 px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
