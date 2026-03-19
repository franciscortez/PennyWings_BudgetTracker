import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Icon from "./Icon";
import Swal from "sweetalert2";
import AnimatedPage from "./common/AnimatedPage";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "bank" },
  { name: "Accounts", href: "/accounts", icon: "card" },
  { name: "Transactions", href: "/transactions", icon: "clock" },
  { name: "Reports", href: "/reports", icon: "reports" },
  { name: "Settings", href: "/profile", icon: "settings" },
];

export default function Layout({ children }) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? saved === "true" : false;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarOpen", String(next));
      return next;
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Wait! Leaving?",
      text: "Are you sure you want to sign out? Your pennies will miss you!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EC4899", // pink-500
      cancelButtonColor: "#94A3B8", // slate-400
      confirmButtonText: "Yes, Log Me Out",
      cancelButtonText: "Cancel",
      background: "#fff",
      borderRadius: "2rem",
      customClass: {
        popup: "rounded-[2.5rem] p-8 font-bold",
        title: "text-2xl font-black text-gray-900",
        confirmButton: "rounded-2xl px-8 py-4 px-10 font-black tracking-tight",
        cancelButton: "rounded-2xl px-8 py-4 font-black tracking-tight",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white px-4 py-3 flex items-center justify-between shadow-sm border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 48 20 C 40 10 30 15 35 20" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 52 20 C 60 10 70 15 65 20" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 48 30 C 20 -5 0 20 15 45 C 0 65 20 95 48 65 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" />
              <path d="M 52 30 C 80 -5 100 20 85 45 C 100 65 80 95 52 65 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" />
              <circle cx="25" cy="30" r="3" fill="currentColor" fillOpacity="0.2" />
              <circle cx="75" cy="30" r="3" fill="currentColor" fillOpacity="0.2" />
              <rect x="47" y="20" width="6" height="45" rx="3" fill="currentColor" />
              <circle cx="50" cy="18" r="4" fill="currentColor" />
            </svg>
          </div>
          <span className="font-bold text-gray-800 tracking-tight">
            PennyWings
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/profile"
            className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 hover:bg-pink-100 transition-colors"
          >
            <Icon name="user" className="w-5 h-5" />
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
            title="Sign Out"
          >
            <Icon name="logout" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar (Desktop) */}
      <aside 
        className={`hidden md:flex flex-col bg-white border-r border-pink-100 h-screen sticky top-0 transition-all duration-300 z-40 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className={`p-6 flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200 shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 48 20 C 40 10 30 15 35 20" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M 52 20 C 60 10 70 15 65 20" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M 48 30 C 20 -5 0 20 15 45 C 0 65 20 95 48 65 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" />
                  <path d="M 52 30 C 80 -5 100 20 85 45 C 100 65 80 95 52 65 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="25" cy="30" r="3" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="75" cy="30" r="3" fill="currentColor" fillOpacity="0.2" />
                  <rect x="47" y="20" width="6" height="45" rx="3" fill="currentColor" />
                  <circle cx="50" cy="18" r="4" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                PennyWings
              </span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-1.5 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors ${!isSidebarOpen ? "mt-2" : ""}`}
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Icon name={isSidebarOpen ? "arrowLeft" : "menu"} className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center ${isSidebarOpen ? "gap-3 px-4" : "justify-center px-0"} py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-pink-50 text-pink-600 shadow-sm shadow-pink-100"
                    : "text-gray-500 hover:bg-pink-50/50 hover:text-pink-500"
                }`}
                title={!isSidebarOpen ? item.name : undefined}
              >
                <Icon
                  name={item.icon}
                  color="currentColor"
                  className="shrink-0 transition-all w-7 h-7"
                />
                {isSidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-pink-50">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isSidebarOpen ? "gap-3 px-4" : "justify-center px-0"} py-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors text-sm font-medium`}
            title={!isSidebarOpen ? "Sign Out" : undefined}
          >
            <Icon name="logout" className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        <AnimatedPage className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </AnimatedPage>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 flex justify-around p-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navigation.filter(item => item.name !== "Settings").map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? "text-pink-600" : "text-gray-400"
              }`}
            >
              <Icon name={item.icon} color="currentColor" className="w-6 h-6" />
              <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
