import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <Outlet />
    </div>
  )
}