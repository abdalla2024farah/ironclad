import React from 'react';
import { AlertTriangle, Shield, Activity, Users, Clock } from 'lucide-react';

interface ActiveAlertsProps {
  criticalAlerts: number;
}

const mockAlerts = [
  {
    id: '1',
    type: 'SECURITY',
    message: 'UNAUTHORIZED ACCESS ATTEMPT - SECTOR 7',
    timestamp: '00:02:15',
    severity: 'CRITICAL',
    location: 'BLOCK C - MAXIMUM SECURITY'
  },
  {
    id: '2',
    type: 'MEDICAL',
    message: 'MEDICAL EMERGENCY - INMATE DOWN',
    timestamp: '00:07:42',
    severity: 'HIGH',
    location: 'CELL 247-B'
  },
  {
    id: '3',
    type: 'PERSONNEL',
    message: 'OFFICER CHECK-IN OVERDUE',
    timestamp: '00:12:08',
    severity: 'MODERATE',
    location: 'NORTH PERIMETER'
  },
  {
    id: '4',
    type: 'SYSTEM',
    message: 'SURVEILLANCE CAMERA OFFLINE',
    timestamp: '00:18:33',
    severity: 'MODERATE',
    location: 'CORRIDOR 12-A'
  }
];

export const ActiveAlerts: React.FC<ActiveAlertsProps> = ({ criticalAlerts }) => {
  return (
    <div className="bg-bastion-dark border border-bastion-steel p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-bastion-mist flex items-center tracking-wider">
          <AlertTriangle className="h-4 w-4 mr-2" />
          ACTIVE ALERTS
        </h3>
        <span className="bg-bastion-alert text-white text-xs font-bold px-2 py-1 tracking-wider">
          {criticalAlerts} CRITICAL
        </span>
      </div>

      <div className="space-y-2">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={`p-3 border ${
            alert.severity === 'CRITICAL' ? 'border-bastion-alert bg-bastion-alert bg-opacity-10' :
            alert.severity === 'HIGH' ? 'border-red-600 bg-red-600 bg-opacity-10' :
            'border-yellow-600 bg-yellow-600 bg-opacity-10'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                {alert.type === 'SECURITY' && <Shield className="h-3 w-3 mt-0.5 text-bastion-alert" />}
                {alert.type === 'MEDICAL' && <Activity className="h-3 w-3 mt-0.5 text-red-400" />}
                {alert.type === 'PERSONNEL' && <Users className="h-3 w-3 mt-0.5 text-yellow-400" />}
                {alert.type === 'SYSTEM' && <Clock className="h-3 w-3 mt-0.5 text-yellow-400" />}
                <div>
                  <p className="text-xs font-bold text-bastion-mist tracking-wider">{alert.message}</p>
                  <p className="text-xs text-bastion-ash tracking-wider">{alert.location}</p>
                  <p className="text-xs text-bastion-smoke tracking-wider">+{alert.timestamp}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-1 py-0.5 tracking-wider ${
                alert.severity === 'CRITICAL' ? 'text-bastion-alert' :
                alert.severity === 'HIGH' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {alert.severity}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-xs text-bastion-mist hover:text-white font-bold tracking-wider border-t border-bastion-steel pt-2">
        VIEW ALL ALERTS →
      </button>
    </div>
  );
};