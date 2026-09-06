import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import BottomNav from "./BottomNav.jsx";
import PageFade from "../PageFade.jsx";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 min-w-0 p-4 md:p-8 pb-24 md:pb-8">
          <PageFade key={location.pathname}>
            <Outlet />
          </PageFade>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
