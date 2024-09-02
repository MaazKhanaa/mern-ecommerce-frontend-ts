import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from "src/layout";

export const Layout: React.FC = () => (
  <div className="d-flex flex-column justify-content-between h-100">
    <Header />
    <div className="content-wrapper">
      <Outlet />
    </div>
    <Footer />
  </div>
);