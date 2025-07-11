import React, { useState, useEffect } from 'react';
import { Inmate } from '../../types';
import { X } from 'lucide-react';

interface InmateFormProps {
  inmate: Inmate | undefined;
  onSave: (inmate: Inmate) => void;
  onCancel: () => void;
}

export const InmateForm: React.FC<InmateFormProps> = ({ inmate, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Inmate>>(inmate || {});

  useEffect(() => {
    setFormData(inmate || {});
  }, [inmate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation here if needed
    onSave(formData as Inmate);
  };

  return (
    <div className="fixed inset-0 bg-bastion-dark bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-bastion-charcoal border border-bastion-steel p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-bastion-mist tracking-wider">
            {inmate ? 'EDIT INMATE' : 'CREATE NEW INMATE'}
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
          <input type="text" name="inmateNumber" placeholder="INMATE NUMBER" value={formData.inmateNumber || ''} onChange={handleChange} className="w-full bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist placeholder-bastion-ash text-xs font-bold tracking-wider" />
          <div className="grid grid-cols-2 gap-4">
            <select name="status" value={formData.status || 'ACTIVE'} onChange={handleChange} className="bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist text-xs font-bold tracking-wider">
              <option value="ACTIVE">ACTIVE</option>
              <option value="MEDICAL">MEDICAL</option>
              <option value="ISOLATION">ISOLATION</option>
              <option value="TRANSFERRED">TRANSFERRED</option>
            </select>
            <select name="threatLevel" value={formData.threatLevel || 'LOW'} onChange={handleChange} className="bg-bastion-dark border border-bastion-steel p-2 text-bastion-mist text-xs font-bold tracking-wider">
              <option value="LOW">LOW</option>
              <option value="MODERATE">MODERATE</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="text-bastion-ash hover:text-white px-4 py-2 text-xs font-bold tracking-wider">CANCEL</button>
            <button type="submit" className="bg-bastion-active text-bastion-mist px-4 py-2 hover:bg-opacity-80 text-xs font-bold tracking-wider">
              {inmate ? 'SAVE CHANGES' : 'CREATE INMATE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};