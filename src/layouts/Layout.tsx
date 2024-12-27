import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" min-h-screen bg-gray-50">
      <div className=" mx-auto container mt-10 px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
