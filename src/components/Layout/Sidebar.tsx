import React from 'react';
import { 
  Shield, 
  Users, 
  UserCheck, 
  Lock, 
  Activity, 
  UserPlus, 
  DollarSign, 
  FileText,
  Settings,
  AlertTriangle,
  Eye,
  Radio
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const menuItems = [
  { id: 'command', label: 'COMMAND CENTER', icon: Shield },
  { id: 'inmates', label: 'INMATE CONTROL', icon: Users },
  { id: 'staff', label: 'PERSONNEL', icon: UserCheck },
  { id: 'security', label: 'SECURITY OPS', icon: Lock },
  { id: 'surveillance', label: 'SURVEILLANCE', icon: Eye },
  { id: 'medical', label: 'MEDICAL', icon: Activity },
  { id: 'visitors', label: 'VISITOR CONTROL', icon: UserPlus },
  { id: 'communications', label: 'COMMS', icon: Radio },
  { id: 'financial', label: 'FINANCIAL', icon: DollarSign },
  { id: 'reports', label: 'INTELLIGENCE', icon: FileText },
  { id: 'incidents', label: 'INCIDENTS', icon: AlertTriangle },
  { id: 'system', label: 'SYSTEM CONFIG', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  return (
    <div className="h-full bg-bastion-black border-r border-bastion-steel w-64 flex flex-col">
      <div className="p-4 border-b border-bastion-steel">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-bastion-mist" />
          <div>
            <h1 className="text-xl font-bold text-bastion-mist tracking-wider">THE BASTION</h1>
            <p className="text-xs text-bastion-ash tracking-widest">PRISON MANAGEMENT SYSTEM</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-xs font-bold tracking-wider transition-colors ${
                    activeModule === item.id
                      ? 'bg-bastion-active text-bastion-mist border-l-2 border-bastion-mist'
                      : 'text-bastion-ash hover:bg-bastion-charcoal hover:text-bastion-mist'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-bastion-steel">
        <div className="text-xs text-bastion-ash">
          <p className="font-bold">FACILITY: MAXIMUM SECURITY</p>
          <p>STATUS: OPERATIONAL</p>
          <p>CLEARANCE: AUTHORIZED</p>
        </div>
      </div>
    </div>
  );
};