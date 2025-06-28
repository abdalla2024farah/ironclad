import React from 'react';
import { Staff } from '../../types';
import { X, User, Briefcase, Clock } from 'lucide-react';

interface StaffDetailsProps {
  staffMember: Staff;
  onClose: () => void;
}

export const StaffDetails: React.FC<StaffDetailsProps> = ({ staffMember, onClose }) => {
    
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ON_DUTY': return 'text-bastion-success';
      case 'OFF_DUTY': return 'text-bastion-ash';
      case 'EMERGENCY': return 'text-bastion-alert';
      default: return 'text-bastion-ash';
    }
  };

  return (
    <div className="fixed inset-0 bg-bastion-dark bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-bastion-charcoal border border-bastion-steel p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-bastion-mist tracking-wider">PERSONNEL FILE: #{staffMember.employeeId}</h2>
          <button onClick={onClose} className="text-bastion-ash hover:text-bastion-mist">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-bastion-dark p-4 border border-bastion-steel text-center">
              <div className="h-24 w-24 bg-bastion-steel flex items-center justify-center text-4xl font-bold text-bastion-mist mx-auto rounded-full">
                {staffMember.firstName[0]}{staffMember.lastName[0]}
              </div>
              <h3 className="text-lg font-bold text-bastion-mist mt-4">{staffMember.firstName} {staffMember.lastName}</h3>
              <p className="text-sm text-bastion-ash">{staffMember.rank}</p>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider flex items-center"><User className="h-4 w-4 mr-2"/>Details</h4>
              <p className={`text-lg font-bold ${getStatusColor(staffMember.status)}`}>{staffMember.status.replace('_',' ')}</p>
            </div>
             <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider flex items-center"><Briefcase className="h-4 w-4 mr-2"/>Assignment</h4>
              <div className="text-xs text-bastion-ash grid grid-cols-2 gap-2">
                 <p><span className="font-bold text-bastion-mist">Clearance:</span> {staffMember.clearanceLevel}</p>
                 <p><span className="font-bold text-bastion-mist">Shift:</span> {staffMember.shift}</p>
                 <p><span className="font-bold text-bastion-mist">Sector:</span> {staffMember.assignedSector}</p>
              </div>
            </div>
             <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider flex items-center"><Clock className="h-4 w-4 mr-2"/>Activity</h4>
               <p className="text-xs text-bastion-ash">Last Check-in: {new Date(staffMember.lastCheckIn).toLocaleString()}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
