import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { CommandCenter } from './components/Command/CommandCenter';
import { InmateControl } from './components/Inmates/InmateControl';
import { mockSystemMetrics, mockInmates as initialInmates } from './data/mockData';
import { Inmate } from './types';

function App() {
  const [activeModule, setActiveModule] = useState('command');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [inmates, setInmates] = useState<Inmate[]>(initialInmates);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addInmate = (inmate: Inmate) => {
    setInmates(prevInmates => [...prevInmates, inmate]);
  };

  const updateInmate = (updatedInmate: Inmate) => {
    setInmates(prevInmates =>
      prevInmates.map(inmate => (inmate.id === updatedInmate.id ? updatedInmate : inmate))
    );
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'command':
        return <CommandCenter metrics={mockSystemMetrics} />;
      case 'inmates':
        return <InmateControl inmates={inmates} addInmate={addInmate} updateInmate={updateInmate} />;
      case 'staff':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">PERSONNEL MANAGEMENT</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">PERSONNEL MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      // ... (keep the other cases as they are)
      default:
        return <CommandCenter metrics={mockSystemMetrics} />;
    }
  };

  return (
    <div className="h-screen bg-bastion-dark flex">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentUser="SGT. MARTINEZ"
          criticalAlerts={mockSystemMetrics.criticalAlerts}
          securityLevel={mockSystemMetrics.securityLevel}
          systemTime={currentTime}
        />

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;