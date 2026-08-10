import React from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-page text-body transition-colors duration-300">
      {/* Sticky Header */}
      <Header />
      
      {/* Main content area: flex-1 ensures it fills the screen height */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;