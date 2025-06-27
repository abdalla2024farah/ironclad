import React from 'react';
import { Shield } from 'lucide-react';

interface ThreatMatrixProps {
  threatLevels: Record<string, number>;
}

export const ThreatMatrix: React.FC<ThreatMatrixProps> = ({ threatLevels }) => {
  return (
    <div className="bg-bastion-dark border border-bastion-steel p-4">
      <h3 className="text-sm font-bold text-bastion-mist mb-4 flex items-center tracking-wider">
        <Shield className="h-4 w-4 mr-2" />
        THREAT MATRIX
      </h3>
      <div className="space-y-3">
        {Object.entries(threatLevels).map(([level, count]) => (
          <div key={level} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${
                level === 'CRITICAL' ? 'bg-bastion-alert' :
                level === 'HIGH' ? 'bg-red-600' :
                level === 'MODERATE' ? 'bg-yellow-600' : 'bg-bastion-success'
              }`} />
              <span className="text-xs text-bastion-ash tracking-wider font-bold">{level}</span>
            </div>
            <span className={`text-sm font-bold tracking-wider ${
              level === 'CRITICAL' ? 'text-bastion-alert' :
              level === 'HIGH' ? 'text-red-400' :
              level === 'MODERATE' ? 'text-yellow-400' : 'text-bastion-success'
            }`}>
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};