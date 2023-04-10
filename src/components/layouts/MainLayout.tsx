import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer } from '../modules';

function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
