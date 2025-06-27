import React from 'react';
import { SystemMetrics } from '../../types';
import { MetricCard } from './MetricCard';
import { ThreatMatrix } from './ThreatMatrix';
import { ActiveAlerts } from './ActiveAlerts';
import { SystemStatus } from './SystemStatus';
import { Users, UserCheck, AlertTriangle, Shield, Activity, Lock } from 'lucide-react';

interface CommandCenterProps {
  metrics: SystemMetrics;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ metrics }) => {
  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">COMMAND CENTER</h1>
        <p className="text-bastion-ash text-sm tracking-wider">REAL-TIME FACILITY OVERSIGHT AND CONTROL</p>
      </div>

      {/* Critical Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="TOTAL POPULATION"
          value={metrics.totalInmates.toString()}
          icon={Users}
          status={metrics.totalInmates > 2400 ? 'critical' : 'normal'}
          subtitle="INMATES SECURED"
        />
        <MetricCard
          title="PERSONNEL ON DUTY"
          value={metrics.staffOnDuty.toString()}
          icon={UserCheck}
          status={metrics.staffOnDuty < 45 ? 'warning' : 'normal'}
          subtitle="STAFF DEPLOYED"
        />
        <MetricCard
          title="ACTIVE INCIDENTS"
          value={metrics.activeIncidents.toString()}
          icon={AlertTriangle}
          status={metrics.activeIncidents > 0 ? 'critical' : 'normal'}
          subtitle="REQUIRING RESPONSE"
        />
        <MetricCard
          title="SECURITY LEVEL"
          value={metrics.securityLevel}
          icon={Shield}
          status={metrics.securityLevel === 'NORMAL' ? 'normal' : 'critical'}
          subtitle="FACILITY STATUS"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-bastion-dark border border-bastion-steel p-4">
          <h3 className="text-sm font-bold text-bastion-mist mb-4 flex items-center tracking-wider">
            <Activity className="h-4 w-4 mr-2" />
            CAPACITY STATUS
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-bastion-ash tracking-wider">UTILIZATION</span>
              <span className={`text-sm font-bold ${
                metrics.capacityUtilization > 95 ? 'text-bastion-alert' : 
                metrics.capacityUtilization > 85 ? 'text-yellow-400' : 'text-bastion-success'
              }`}>
                {metrics.capacityUtilization}%
              </span>
            </div>
            <div className="w-full bg-bastion-charcoal h-2">
              <div
                className={`h-2 ${
                  metrics.capacityUtilization > 95 ? 'bg-bastion-alert' : 
                  metrics.capacityUtilization > 85 ? 'bg-yellow-600' : 'bg-bastion-success'
                }`}
                style={{ width: `${Math.min(metrics.capacityUtilization, 100)}%` }}
              />
            </div>
            <div className="text-xs text-bastion-ash tracking-wider">
              <div className="flex justify-between">
                <span>CURRENT: {metrics.totalInmates}</span>
                <span>MAXIMUM: 2500</span>
              </div>
            </div>
          </div>
        </div>

        <ThreatMatrix threatLevels={metrics.inmatesByThreatLevel} />
        <SystemStatus 
          integrity={metrics.systemIntegrity}
          lastHeadcount={metrics.lastHeadcount}
          accuracy={metrics.headcountAccuracy}
          lockdownStatus={metrics.lockdownStatus}
        />
      </div>

      {/* Active Alerts */}
      <ActiveAlerts criticalAlerts={metrics.criticalAlerts} />
    </div>
  );
};