import React from 'react';
import { Clock, User, AlertTriangle, UserPlus, Shield } from 'lucide-react';

const recentActivities = [
  {
    id: '1',
    type: 'admission',
    description: 'New inmate admission: John Doe (ID: 2024-1247)',
    timestamp: '10 minutes ago',
    user: 'Officer Martinez',
    icon: UserPlus
  },
  {
    id: '2',
    type: 'incident',
    description: 'Incident report filed: Altercation in Block B',
    timestamp: '25 minutes ago',
    user: 'Officer Johnson',
    icon: AlertTriangle
  },
  {
    id: '3',
    type: 'security',
    description: 'Security round completed: East Wing',
    timestamp: '32 minutes ago',
    user: 'Officer Davis',
    icon: Shield
  },
  {
    id: '4',
    type: 'medical',
    description: 'Medical appointment scheduled for inmate #1156',
    timestamp: '45 minutes ago',
    user: 'Nurse Thompson',
    icon: User
  }
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-gray-600" />
        Recent Activity
      </h3>

      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.type === 'incident' ? 'bg-red-100' :
                activity.type === 'security' ? 'bg-blue-100' :
                activity.type === 'medical' ? 'bg-green-100' :
                'bg-gray-100'
              }`}>
                <Icon className={`h-4 w-4 ${
                  activity.type === 'incident' ? 'text-red-600' :
                  activity.type === 'security' ? 'text-blue-600' :
                  activity.type === 'medical' ? 'text-green-600' :
                  'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  <span className="text-xs text-gray-400">•</span>
                  <p className="text-xs text-gray-600">{activity.user}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        View Activity Log →
      </button>
    </div>
  );
};