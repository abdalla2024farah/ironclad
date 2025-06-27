import React from 'react';

interface CapacityChartProps {
  utilization: number;
}

export const CapacityChart: React.FC<CapacityChartProps> = ({ utilization }) => {
  const getColor = (util: number) => {
    if (util >= 95) return 'text-red-600 bg-red-600';
    if (util >= 85) return 'text-yellow-600 bg-yellow-600';
    return 'text-green-600 bg-green-600';
  };

  const colorClass = getColor(utilization);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900">{utilization}%</span>
        <span className={`text-sm font-medium ${colorClass.split(' ')[0]}`}>
          {utilization >= 95 ? 'Overcapacity' : utilization >= 85 ? 'Near Capacity' : 'Optimal'}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${colorClass.split(' ')[1]} transition-all duration-500`}
          style={{ width: `${Math.min(utilization, 100)}%` }}
        />
      </div>
      
      <div className="text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Current: 1,247 inmates</span>
          <span>Capacity: 1,280</span>
        </div>
      </div>
    </div>
  );
};