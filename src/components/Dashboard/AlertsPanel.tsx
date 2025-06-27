import React from 'react';
import { AlertTriangle, Clock, Users, Shield } from 'lucide-react';

interface AlertsPanelProps {
  criticalAlerts: number;
}

const mockAlerts = [
  {
    id: '1',
    type: 'Security',
    message: 'Unauthorized access attempt - Block C',
    timestamp: '2 min ago',
    severity: 'critical'
  },
  {
    id: '2',
    type: 'Medical',
    message: 'Medical emergency - Cell 247',
    timestamp: '15 min ago',
    severity: 'high'
  },
  {
    id: '3',
    type: 'Staffing',
    message: 'Officer check-in overdue - North Wing',
    timestamp: '23 min ago',
    severity: 'medium'
  }
];

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ criticalAlerts }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
          Active Alerts
        </h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {criticalAlerts} Critical
        </span>
      </div>

      <div className="space-y-3">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className={`p-3 rounded-lg border ${
            alert.severity === 'critical' ? 'border-red-200 bg-red-50' :
            alert.severity === 'high' ? 'border-orange-200 bg-orange-50' :
            'border-yellow-200 bg-yellow-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                {alert.type === 'Security' && <Shield className="h-4 w-4 mt-0.5 text-red-600" />}
                {alert.type === 'Medical' && <Users className="h-4 w-4 mt-0.5 text-orange-600" />}
                {alert.type === 'Staffing' && <Clock className="h-4 w-4 mt-0.5 text-yellow-600" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        View All Alerts →
      </button>
    </div>
  );
};