import React from 'react';
import { Search, AlertTriangle, User, LogOut, Shield, Clock } from 'lucide-react';

interface HeaderProps {
  currentUser: string;
  criticalAlerts: number;
  securityLevel: string;
  systemTime: string;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, criticalAlerts, securityLevel, systemTime }) => {
  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'MAXIMUM': return 'text-bastion-alert bg-bastion-alert';
      case 'HIGH': return 'text-yellow-400 bg-yellow-900';
      case 'ELEVATED': return 'text-orange-400 bg-orange-900';
      default: return 'text-bastion-success bg-green-900';
    }
  };

  return (
    <header className="bg-bastion-dark border-b border-bastion-steel px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bastion-ash h-4 w-4" />
            <input
              type="text"
              placeholder="SEARCH INMATES, STAFF, INCIDENTS..."
              className="w-full pl-10 pr-4 py-2 bg-bastion-charcoal border border-bastion-steel text-bastion-mist placeholder-bastion-ash focus:border-bastion-mist focus:outline-none text-xs font-bold tracking-wider"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-bastion-ash" />
              <span className={`text-xs font-bold px-2 py-1 ${getSecurityLevelColor(securityLevel)} bg-opacity-20`}>
                {securityLevel}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-bastion-ash" />
              <span className="text-xs font-bold text-bastion-mist tracking-wider">{systemTime}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-bastion-ash hover:text-bastion-mist hover:bg-bastion-charcoal">
            <AlertTriangle className="h-5 w-5" />
            {criticalAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-bastion-alert text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {criticalAlerts}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-2 px-3 py-2 bg-bastion-charcoal border border-bastion-steel">
            <User className="h-4 w-4 text-bastion-ash" />
            <span className="text-xs font-bold text-bastion-mist tracking-wider">{currentUser}</span>
          </div>

          <button className="p-2 text-bastion-ash hover:text-bastion-mist hover:bg-bastion-charcoal">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};