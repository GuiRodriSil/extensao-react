import React from 'react';
import SidePanel from './components/SidePanel';
import TicketPage from './components/TicketPage';
import UsersPage from './components/UsersPage';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>JET DATA</h1>
      
      <div className="section-container">
        <TicketPage />
      </div>
      
      <div className="section-container">
        <UsersPage />
      </div>
      
      <div className="section-container">
        <SidePanel />
      </div>
    </div>
  );
};

export default App;
