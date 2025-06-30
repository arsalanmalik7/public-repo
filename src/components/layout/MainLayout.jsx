import React from 'react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../common/sidebar';
import Header from '../common/header';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-20 bg-white">
          <Header setSidebarOpen={setSidebarOpen} />
        </div>
        <main className="p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 