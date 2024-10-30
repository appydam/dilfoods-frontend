import logo from './logo.svg';
import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeScanner from './components/QRCodeScanner';
import Predictions from './components/Predictions';
import InventoryManagement from './components/InventoryManagement';

function App() {
  return (
    <>


      <div className={`bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_5px),linear-gradient(to_bottom,#8080800a_1px,transparent_5px)] bg-[size:14px_24px] h-[100vh]`}>

        {/* <div className="min-h-screen bg-gray-50 p-8"> */}
        <h1 className="text-4xl font-bold text-center mb-8">Dilfoods</h1>
        <h1 className="text-2xl font-bold text-center mb-8">Inventory Management System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Dashboard />
          <QRCodeGenerator />
          <QRCodeScanner />
          <Predictions />
          <InventoryManagement />
        </div>

      </div>
      {/* </div> */}


    </>

  );
}

export default App;
