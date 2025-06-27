import React from 'react';
import { Activity, Clock, Users, Lock } from 'lucide-react';

interface SystemStatusProps {
  integrity: number;
  lastHeadcount: string;
  accuracy: number;
  lockdownStatus: boolean;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({
  integrity,
  lastHeadcount,
  accuracy,
  lockdownStatus
}) => {
  return (
    <div className="bg-bastion-dark border border-bastion-steel p-4">
      <h3 className="text-sm font-bold text-bastion-mist mb-4 flex items-center tracking-wider">
        <Activity className="h-4 w-4 mr-2" />
        SYSTEM STATUS
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-bastion-ash tracking-wider font-bold">SYSTEM INTEGRITY</span>
          <span className={`text-sm font-bold tracking-wider ${
            integrity > 95 ? 'text-bastion-success' : 
            integrity > 85 ? 'text-yellow-400' : 'text-bastion-alert'
          }`}>
            {integrity}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-bastion-ash" />
            <span className="text-xs text-bastion-ash tracking-wider font-bold">LAST HEADCOUNT</span>
          </div>
          <span className="text-xs text-bastion-mist tracking-wider">{lastHeadcount}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3 text-bastion-ash" />
            <span className="text-xs text-bastion-ash tracking-wider font-bold">ACCURACY</span>
          </div>
          <span className={`text-sm font-bold tracking-wider ${
            accuracy === 100 ? 'text-bastion-success' : 'text-bastion-alert'
          }`}>
            {accuracy}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Lock className="h-3 w-3 text-bastion-ash" />
            <span className="text-xs text-bastion-ash tracking-wider font-bold">LOCKDOWN</span>
          </div>
          <span className={`text-xs font-bold tracking-wider px-2 py-1 ${
            lockdownStatus ? 'text-bastion-alert bg-bastion-alert bg-opacity-20' : 'text-bastion-success bg-bastion-success bg-opacity-20'
          }`}>
            {lockdownStatus ? 'ACTIVE' : 'INACTIVE'}
          </span>
        </div>
      </div>
    </div>
  );
};