import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
  subtitle: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  status,
  subtitle
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'border-bastion-alert bg-bastion-alert bg-opacity-10';
      case 'warning': return 'border-yellow-600 bg-yellow-600 bg-opacity-10';
      default: return 'border-bastion-steel bg-bastion-dark';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'critical': return 'text-bastion-alert';
      case 'warning': return 'text-yellow-400';
      default: return 'text-bastion-mist';
    }
  };

  return (
    <div className={`border p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <Icon className={`h-6 w-6 ${getTextColor()}`} />
        <div className={`w-2 h-2 rounded-full ${
          status === 'critical' ? 'bg-bastion-alert' :
          status === 'warning' ? 'bg-yellow-400' : 'bg-bastion-success'
        }`} />
      </div>
      <div>
        <p className={`text-2xl font-bold ${getTextColor()} tracking-wider`}>{value}</p>
        <p className="text-xs text-bastion-ash tracking-wider font-bold">{title}</p>
        <p className="text-xs text-bastion-smoke tracking-wider">{subtitle}</p>
      </div>
    </div>
  );
};