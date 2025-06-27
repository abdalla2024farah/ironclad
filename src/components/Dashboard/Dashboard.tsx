import React from 'react';
import { DashboardMetrics } from '../../types';
import { MetricCard } from './MetricCard';
import { AlertsPanel } from './AlertsPanel';
import { CapacityChart } from './CapacityChart';
import { RecentActivity } from './RecentActivity';
import { Users, UserCheck, AlertTriangle, Calendar, TrendingUp, Shield } from 'lucide-react';

interface DashboardProps {
  metrics: DashboardMetrics;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Facility Dashboard</h1>
        <p className="text-gray-600">Real-time operational overview and critical metrics</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Population"
          value={metrics.totalInmates.toString()}
          icon={Users}
          trend={+2.3}
          color="blue"
        />
        <MetricCard
          title="Staff On Duty"
          value={metrics.staffOnDuty.toString()}
          icon={UserCheck}
          trend={0}
          color="green"
        />
        <MetricCard
          title="Open Incidents"
          value={metrics.openIncidents.toString()}
          icon={AlertTriangle}
          trend={-12.5}
          color={metrics.openIncidents > 5 ? "red" : "yellow"}
        />
        <MetricCard
          title="Today's Visits"
          value={metrics.todayVisits.toString()}
          icon={Calendar}
          trend={+8.1}
          color="purple"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Capacity Utilization
          </h3>
          <CapacityChart utilization={metrics.capacityUtilization} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            Security Classification
          </h3>
          <div className="space-y-3">
            {Object.entries(metrics.inmatesByClassification).map(([level, count]) => (
              <div key={level} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{level}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{count}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    level === 'Maximum' ? 'bg-red-500' :
                    level === 'Medium' ? 'bg-yellow-500' :
                    level === 'Minimum' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <AlertsPanel criticalAlerts={metrics.criticalAlerts} />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};