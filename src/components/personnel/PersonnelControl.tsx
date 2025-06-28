import React, { useState } from 'react';
import { Staff } from '../../types';
import { StaffForm } from './StaffForm';
import { StaffDetails } from './StaffDetails';
import { Search, Filter, Eye, Edit, Trash2, UserPlus } from 'lucide-react';

interface PersonnelControlProps {
  staff: Staff[];
  addStaff: (staffMember: Staff) => void;
  updateStaff: (staffMember: Staff) => void;
  deleteStaff: (staffId: string) => void;
}

export const PersonnelControl: React.FC<PersonnelControlProps> = ({ staff, addStaff, updateStaff, deleteStaff }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRank, setFilterRank] = useState<string>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | undefined>(undefined);
  const [viewingStaff, setViewingStaff] = useState<Staff | undefined>(undefined);
  const [deletingStaff, setDeletingStaff] = useState<Staff | undefined>(undefined);

  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch =
      staffMember.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.employeeId.includes(searchTerm);

    const matchesStatus = filterStatus === 'all' || staffMember.status === filterStatus;
    const matchesRank = filterRank === 'all' || staffMember.rank === filterRank;

    return matchesSearch && matchesStatus && matchesRank;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ON_DUTY': return 'text-bastion-success bg-bastion-success bg-opacity-20';
      case 'OFF_DUTY': return 'text-bastion-ash bg-bastion-steel bg-opacity-20';
      case 'EMERGENCY': return 'text-bastion-alert bg-bastion-alert bg-opacity-20';
      default: return 'text-bastion-ash bg-bastion-steel bg-opacity-20';
    }
  };

  const handleSaveStaff = (formData: Partial<Staff>) => {
    if (editingStaff) {
      updateStaff({ ...editingStaff, ...formData } as Staff);
    } else {
        const newStaffMember: Staff = {
        id: new Date().toISOString(),
        clearanceLevel: 'BASIC',
        shift: 'ALPHA',
        lastCheckIn: new Date().toISOString(),
        assignedSector: 'N/A',
        distressAlert: false,
        ...formData,
        employeeId: formData.employeeId || `EMP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        firstName: formData.firstName || 'N/A',
        lastName: formData.lastName || 'N/A',
        rank: formData.rank || 'OFFICER',
        status: formData.status || 'OFF_DUTY',
        currentLocation: formData.currentLocation || 'Unassigned'
      };
      addStaff(newStaffMember);
    }
    setIsCreating(false);
    setEditingStaff(undefined);
  };
  
  const confirmDelete = () => {
    if (deletingStaff) {
      deleteStaff(deletingStaff.id);
      setDeletingStaff(undefined);
    }
  };

  return (
    <div className="p-6">
      {viewingStaff && <StaffDetails staffMember={viewingStaff} onClose={() => setViewingStaff(undefined)} />}
      {(isCreating || editingStaff) && (
        <StaffForm
          staffMember={editingStaff}
          onSave={handleSaveStaff}
          onCancel={() => {
            setIsCreating(false);
            setEditingStaff(undefined);
          }}
        />
      )}
      {deletingStaff && (
         <div className="fixed inset-0 bg-bastion-dark bg-opacity-90 flex items-center justify-center z-50">
           <div className="bg-bastion-charcoal border border-bastion-alert p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-bastion-alert tracking-wider">CONFIRM DELETION</h2>
                <p className="text-bastion-mist my-4">Are you sure you want to delete {deletingStaff.firstName} {deletingStaff.lastName}'s record? This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                    <button onClick={() => setDeletingStaff(undefined)} className="text-bastion-ash hover:text-white px-4 py-2 text-xs font-bold tracking-wider">CANCEL</button>
                    <button onClick={confirmDelete} className="bg-bastion-alert text-white px-4 py-2 hover:bg-opacity-80 text-xs font-bold tracking-wider">DELETE</button>
                </div>
           </div>
        </div>
      )}

      <div className="mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">PERSONNEL MANAGEMENT</h1>
            <p className="text-bastion-ash text-sm tracking-wider">STAFF ROSTER AND STATUS CONTROL</p>
        </div>
        <button
            onClick={() => setIsCreating(true)}
            className="bg-bastion-active text-bastion-mist px-4 py-2 hover:bg-opacity-80 flex items-center space-x-2 text-xs font-bold tracking-wider"
        >
            <UserPlus className="h-4 w-4" />
            <span>ADD PERSONNEL</span>
        </button>
      </div>

      <div className="bg-bastion-dark border border-bastion-steel">
        <div className="border-b border-bastion-steel p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bastion-ash h-4 w-4" />
              <input
                type="text"
                placeholder="SEARCH BY NAME OR EMPLOYEE ID..."
                className="w-full pl-10 pr-4 py-2 bg-bastion-charcoal border border-bastion-steel text-bastion-mist placeholder-bastion-ash focus:border-bastion-mist focus:outline-none text-xs font-bold tracking-wider"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="bg-bastion-charcoal border border-bastion-steel text-bastion-mist text-xs font-bold tracking-wider px-3 py-2 focus:border-bastion-mist focus:outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">ALL STATUS</option>
              <option value="ON_DUTY">ON DUTY</option>
              <option value="OFF_DUTY">OFF DUTY</option>
              <option value="EMERGENCY">EMERGENCY</option>
            </select>

            <select
              className="bg-bastion-charcoal border border-bastion-steel text-bastion-mist text-xs font-bold tracking-wider px-3 py-2 focus:border-bastion-mist focus:outline-none"
              value={filterRank}
              onChange={(e) => setFilterRank(e.target.value)}
            >
                <option value="all">ALL RANKS</option>
                <option value="OFFICER">OFFICER</option>
                <option value="SERGEANT">SERGEANT</option>
                <option value="LIEUTENANT">LIEUTENANT</option>
                <option value="CAPTAIN">CAPTAIN</option>
                <option value="WARDEN">WARDEN</option>
                <option value="MEDICAL">MEDICAL</option>
                <option value="ADMIN">ADMIN</option>
                <option value="JANITOR">JANITOR</option>
            </select>
            <button className="bg-bastion-active text-bastion-mist px-4 py-2 hover:bg-opacity-80 flex items-center space-x-2 text-xs font-bold tracking-wider">
              <Filter className="h-4 w-4" />
              <span>FILTER</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bastion-charcoal">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">PERSONNEL</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">RANK</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">LOCATION</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">SHIFT</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bastion-steel">
              {filteredStaff.map((staffMember) => (
                <tr key={staffMember.id} className="hover:bg-bastion-charcoal hover:bg-opacity-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 bg-bastion-steel flex items-center justify-center text-xs font-bold text-bastion-mist">
                          {staffMember.firstName[0]}{staffMember.lastName[0]}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-xs font-bold text-bastion-mist tracking-wider">{staffMember.firstName} {staffMember.lastName}</div>
                        <div className="text-xs text-bastion-ash tracking-wider">#{staffMember.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-1 text-xs font-bold tracking-wider ${getStatusColor(staffMember.status)}`}>{staffMember.status.replace('_', ' ')}</span></td>
                  <td className="px-4 py-3 text-xs font-bold text-bastion-mist tracking-wider">{staffMember.rank}</td>
                  <td className="px-4 py-3 text-xs text-bastion-mist tracking-wider">{staffMember.currentLocation}</td>
                  <td className="px-4 py-3 text-xs text-bastion-mist tracking-wider">{staffMember.shift}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setViewingStaff(staffMember)} className="text-bastion-mist hover:text-white"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => setEditingStaff(staffMember)} className="text-bastion-mist hover:text-white"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => setDeletingStaff(staffMember)} className="text-bastion-mist hover:text-bastion-alert"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
