import React from 'react';
import { Inmate } from '../../types';
import { X, User, Shield, Activity, Calendar, FileText, AlertTriangle } from 'lucide-react';

interface InmateDetailsProps {
  inmate: Inmate;
  onClose: () => void;
}

export const InmateDetails: React.FC<InmateDetailsProps> = ({ inmate, onClose }) => {
  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'CRITICAL': return 'text-bastion-alert';
      case 'HIGH': return 'text-red-400';
      case 'MODERATE': return 'text-yellow-400';
      case 'LOW': return 'text-bastion-success';
      default: return 'text-bastion-ash';
    }
  };

  return (
    <div className="fixed inset-0 bg-bastion-dark bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-bastion-charcoal border border-bastion-steel p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-bastion-mist tracking-wider">INMATE PROFILE: #{inmate.inmateNumber}</h2>
          <button onClick={onClose} className="text-bastion-ash hover:text-bastion-mist">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-bastion-steel flex items-center justify-center text-2xl font-bold text-bastion-mist">
                  {inmate.firstName[0]}{inmate.lastName[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-bastion-mist">{inmate.firstName} {inmate.lastName}</h3>
                  <p className="text-sm text-bastion-ash">STATUS: {inmate.status}</p>
                </div>
              </div>
            </div>
            <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider">THREAT LEVEL</h4>
              <p className={`text-2xl font-bold ${getThreatColor(inmate.threatLevel)}`}>{inmate.threatLevel}</p>
            </div>
             <div className="bg-bastion-dark p-4 border border-bastion-steel">
                <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider">Vitals</h4>
                <div className="text-xs text-bastion-ash space-y-1">
                    <p>DOB: {inmate.dateOfBirth}</p>
                    <p>Admission: {inmate.admissionDate}</p>
                    <p>Release: {inmate.releaseDate || 'N/A'}</p>
                    <p>Sentence: {inmate.sentence}</p>
                </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider flex items-center"><Shield className="h-4 w-4 mr-2"/>Security Information</h4>
              <div className="text-xs text-bastion-ash grid grid-cols-2 gap-2">
                <p><span className="font-bold text-bastion-mist">Classification:</span> {inmate.classification}</p>
                <p><span className="font-bold text-bastion-mist">Location:</span> {inmate.cellBlock}-{inmate.cellNumber}</p>
                <p><span className="font-bold text-bastion-mist">Behavioral:</span> {inmate.behavior}</p>
                <p><span className="font-bold text-bastion-mist">Disciplinary Actions:</span> {inmate.disciplinaryActions}</p>
              </div>
            </div>
            <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider flex items-center"><FileText className="h-4 w-4 mr-2"/>Charges</h4>
              <ul className="text-xs text-bastion-ash list-disc list-inside">
                {inmate.charges.map((charge, index) => <li key={index}>{charge}</li>)}
              </ul>
            </div>
            <div className="bg-bastion-dark p-4 border border-bastion-steel">
              <h4 className="text-sm font-bold text-bastion-mist mb-2 tracking-wider flex items-center"><AlertTriangle className="h-4 w-4 mr-2"/>Medical Flags</h4>
               <ul className="text-xs text-bastion-ash list-disc list-inside">
                {inmate.medicalFlags.length > 0 ? inmate.medicalFlags.map((flag, index) => <li key={index}>{flag}</li>) : <li>No Flags</li>}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};