import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { CommandCenter } from './components/Command/CommandCenter';
import { InmateControl } from './components/Inmates/InmateControl';
import { mockSystemMetrics, mockInmates } from './data/mockData';

function App() {
  const [activeModule, setActiveModule] = useState('command');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeModule) {
      case 'command':
        return <CommandCenter metrics={mockSystemMetrics} />;
      case 'inmates':
        return <InmateControl inmates={mockInmates} />;
      case 'staff':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">PERSONNEL MANAGEMENT</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">PERSONNEL MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">SECURITY OPERATIONS</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">SECURITY OPERATIONS MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'surveillance':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">SURVEILLANCE CONTROL</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">SURVEILLANCE MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'medical':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">MEDICAL SERVICES</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">MEDICAL SERVICES MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'visitors':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">VISITOR CONTROL</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">VISITOR CONTROL MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'communications':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">COMMUNICATIONS</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">COMMUNICATIONS MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'financial':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">FINANCIAL MANAGEMENT</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">FINANCIAL MANAGEMENT MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">INTELLIGENCE REPORTS</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">INTELLIGENCE MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'incidents':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">INCIDENT MANAGEMENT</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">INCIDENT MANAGEMENT MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
      case 'system':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">SYSTEM CONFIGURATION</h1>
            <div className="bg-bastion-dark border border-bastion-steel p-8 text-center">
              <p className="text-bastion-ash tracking-wider">SYSTEM CONFIGURATION MODULE UNDER DEVELOPMENT</p>
            </div>
          </div>
        );
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