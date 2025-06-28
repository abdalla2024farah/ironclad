import React, { useState, useEffect } from 'react';
import { Staff } from '../../types';
import { X } from 'lucide-react';

interface StaffFormProps {
  staffMember: Staff | undefined;
  onSave: (staffMember: Partial<Staff>) => void;
  onCancel: () => void;
}

export const StaffForm: React.FC<StaffFormProps> = ({ staffMember, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Staff>>(staffMember || {});

  useEffect(() => {
    setFormData(staffMember || {});
  }, [staffMember]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-bastion-dark bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-bastion-charcoal border border-bastion-steel p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-bastion-mist tracking-wider">
            {staffMember ? 'EDIT PERSONNEL' : 'CREATE NEW PERSONNEL'}
          </h2>
          <button onClick={onCancel} className="text-bastion-ash hover:text-bastion-mist">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="FIRST NAME" value={formData.firstName || ''} onChange={handleChange} className="bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist placeholder-bastion-ash text-xs font-bold tracking-wider" />
            <input type="text" name="lastName" placeholder="LAST NAME" value={formData.lastName || ''} onChange={handleChange} className="bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist placeholder-bastion-ash text-xs font-bold tracking-wider" />
          </div>
          <input type="text" name="employeeId" placeholder="EMPLOYEE ID" value={formData.employeeId || ''} onChange={handleChange} className="w-full bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist placeholder-bastion-ash text-xs font-bold tracking-wider" />
          <div className="grid grid-cols-2 gap-4">
            <select name="rank" value={formData.rank || 'OFFICER'} onChange={handleChange} className="bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist text-xs font-bold tracking-wider">
              <option value="OFFICER">OFFICER</option>
              <option value="SERGEANT">SERGEANT</option>
              <option value="LIEUTENANT">LIEUTENANT</option>
              <option value="CAPTAIN">CAPTAIN</option>
              <option value="WARDEN">WARDEN</option>
              <option value="MEDICAL">MEDICAL</option>
              <option value="ADMIN">ADMIN</option>
              <option value="JANITOR">JANITOR</option>
            </select>
             <select name="status" value={formData.status || 'OFF_DUTY'} onChange={handleChange} className="bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist text-xs font-bold tracking-wider">
              <option value="ON_DUTY">ON DUTY</option>
              <option value="OFF_DUTY">OFF DUTY</option>
              <option value="EMERGENCY">EMERGENCY</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="text-bastion-ash hover:text-white px-4 py-2 text-xs font-bold tracking-wider">CANCEL</button>
            <button type="submit" className="bg-bastion-active text-bastion-mist px-4 py-2 hover:bg-opacity-80 text-xs font-bold tracking-wider">
              {staffMember ? 'SAVE CHANGES' : 'ADD PERSONNEL'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
