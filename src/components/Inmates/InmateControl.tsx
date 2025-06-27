import React, { useState } from 'react';
import { Inmate } from '../../types';
import { Search, Filter, Eye, Edit, MoreHorizontal, AlertTriangle, MapPin, Radio } from 'lucide-react';

interface InmateControlProps {
  inmates: Inmate[];
}

export const InmateControl: React.FC<InmateControlProps> = ({ inmates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterThreat, setFilterThreat] = useState<string>('all');

  const filteredInmates = inmates.filter(inmate => {
    const matchesSearch = 
      inmate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.inmateNumber.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || inmate.status === filterStatus;
    const matchesThreat = filterThreat === 'all' || inmate.threatLevel === filterThreat;
    
    return matchesSearch && matchesStatus && matchesThreat;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-bastion-success bg-bastion-success bg-opacity-20';
      case 'MEDICAL': return 'text-yellow-400 bg-yellow-600 bg-opacity-20';
      case 'ISOLATION': return 'text-bastion-alert bg-bastion-alert bg-opacity-20';
      case 'TRANSFERRED': return 'text-blue-400 bg-blue-600 bg-opacity-20';
      default: return 'text-bastion-ash bg-bastion-steel bg-opacity-20';
    }
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'CRITICAL': return 'text-bastion-alert bg-bastion-alert bg-opacity-20';
      case 'HIGH': return 'text-red-400 bg-red-600 bg-opacity-20';
      case 'MODERATE': return 'text-yellow-400 bg-yellow-600 bg-opacity-20';
      case 'LOW': return 'text-bastion-success bg-bastion-success bg-opacity-20';
      default: return 'text-bastion-ash bg-bastion-steel bg-opacity-20';
    }
  };

  const getBehaviorColor = (behavior: string) => {
    switch (behavior) {
      case 'COMPLIANT': return 'text-bastion-success';
      case 'PROBLEMATIC': return 'text-yellow-400';
      case 'VIOLENT': return 'text-red-400';
      case 'CRITICAL': return 'text-bastion-alert';
      default: return 'text-bastion-ash';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bastion-mist mb-1 tracking-wider">INMATE CONTROL</h1>
        <p className="text-bastion-ash text-sm tracking-wider">COMPREHENSIVE INMATE MONITORING AND MANAGEMENT</p>
      </div>

      <div className="bg-bastion-dark border border-bastion-steel">
        {/* Search and Filters */}
        <div className="border-b border-bastion-steel p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bastion-ash h-4 w-4" />
              <input
                type="text"
                placeholder="SEARCH BY NAME OR INMATE NUMBER..."
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
              <option value="ACTIVE">ACTIVE</option>
              <option value="MEDICAL">MEDICAL</option>
              <option value="ISOLATION">ISOLATION</option>
              <option value="TRANSFERRED">TRANSFERRED</option>
            </select>

            <select
              className="bg-bastion-charcoal border border-bastion-steel text-bastion-mist text-xs font-bold tracking-wider px-3 py-2 focus:border-bastion-mist focus:outline-none"
              value={filterThreat}
              onChange={(e) => setFilterThreat(e.target.value)}
            >
              <option value="all">ALL THREAT LEVELS</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MODERATE">MODERATE</option>
              <option value="LOW">LOW</option>
            </select>

            <button className="bg-bastion-active text-bastion-mist px-4 py-2 hover:bg-opacity-80 flex items-center space-x-2 text-xs font-bold tracking-wider">
              <Filter className="h-4 w-4" />
              <span>FILTER</span>
            </button>
          </div>
        </div>

        {/* Inmates Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bastion-charcoal">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">
                  INMATE
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">
                  THREAT LEVEL
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">
                  LOCATION
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">
                  SENTENCE
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">
                  BEHAVIOR
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-bastion-mist tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bastion-steel">
              {filteredInmates.map((inmate) => (
                <tr key={inmate.id} className="hover:bg-bastion-charcoal hover:bg-opacity-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 bg-bastion-steel flex items-center justify-center text-xs font-bold text-bastion-mist">
                          {inmate.firstName[0]}{inmate.lastName[0]}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-xs font-bold text-bastion-mist tracking-wider">
                          {inmate.firstName} {inmate.lastName}
                        </div>
                        <div className="text-xs text-bastion-ash tracking-wider">#{inmate.inmateNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold tracking-wider ${getStatusColor(inmate.status)}`}>
                      {inmate.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold tracking-wider ${getThreatColor(inmate.threatLevel)}`}>
                      {inmate.threatLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-bastion-ash" />
                      <span className="text-xs font-bold text-bastion-mist tracking-wider">
                        {inmate.cellBlock}-{inmate.cellNumber}
                      </span>
                    </div>
                    <div className="text-xs text-bastion-ash tracking-wider">{inmate.currentLocation}</div>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-bastion-mist tracking-wider">
                    {inmate.sentence}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-bold tracking-wider ${getBehaviorColor(inmate.behavior)}`}>
                        {inmate.behavior}
                      </span>
                      {inmate.medicalFlags.length > 0 && (
                        <AlertTriangle className="h-3 w-3 text-bastion-alert" title="MEDICAL ALERT" />
                      )}
                      {inmate.disciplinaryActions > 0 && (
                        <span className="text-xs text-bastion-alert font-bold">({inmate.disciplinaryActions})</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-bastion-mist hover:text-white">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-bastion-mist hover:text-white">
                        <Radio className="h-4 w-4" />
                      </button>
                      <button className="text-bastion-ash hover:text-bastion-mist">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-bastion-charcoal px-4 py-3 border-t border-bastion-steel flex items-center justify-between">
          <div className="text-xs text-bastion-ash tracking-wider font-bold">
            SHOWING {filteredInmates.length} OF {inmates.length} INMATES
          </div>
          <div className="text-xs text-bastion-ash tracking-wider font-bold">
            LAST UPDATE: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};