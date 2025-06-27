export interface Inmate {
  id: string;
  inmateNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  admissionDate: string;
  releaseDate?: string;
  classification: 'MAXIMUM' | 'HIGH' | 'MEDIUM' | 'MINIMUM' | 'PROTECTIVE' | 'ADMINISTRATIVE';
  status: 'ACTIVE' | 'MEDICAL' | 'ISOLATION' | 'TRANSFERRED' | 'RELEASED' | 'DECEASED';
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  cellBlock: string;
  cellNumber: string;
  charges: string[];
  sentence: string;
  behavior: 'COMPLIANT' | 'PROBLEMATIC' | 'VIOLENT' | 'CRITICAL';
  medicalFlags: string[];
  disciplinaryActions: number;
  lastIncident?: string;
  biometricId: string;
  rfidTag: string;
  currentLocation: string;
  lastMovement: string;
}

export interface Staff {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  rank: 'OFFICER' | 'SERGEANT' | 'LIEUTENANT' | 'CAPTAIN' | 'WARDEN' | 'MEDICAL' | 'ADMIN';
  clearanceLevel: 'BASIC' | 'ELEVATED' | 'HIGH' | 'MAXIMUM';
  shift: 'ALPHA' | 'BRAVO' | 'CHARLIE';
  status: 'ON_DUTY' | 'OFF_DUTY' | 'EMERGENCY' | 'UNAVAILABLE';
  currentLocation: string;
  lastCheckIn: string;
  assignedSector: string;
  distressAlert: boolean;
}

export interface SecurityIncident {
  id: string;
  type: 'ASSAULT' | 'CONTRABAND' | 'ESCAPE_ATTEMPT' | 'RIOT' | 'MEDICAL_EMERGENCY' | 'BREACH' | 'WEAPON' | 'DRUG';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  status: 'ACTIVE' | 'CONTAINED' | 'INVESTIGATING' | 'RESOLVED' | 'ARCHIVED';
  location: string;
  reportedBy: string;
  timestamp: string;
  description: string;
  inmatesInvolved: string[];
  staffInvolved: string[];
  responseTime: number;
  evidenceCollected: boolean;
  lockdownTriggered: boolean;
}

export interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  inmateId: string;
  clearanceStatus: 'APPROVED' | 'PENDING' | 'DENIED' | 'RESTRICTED' | 'BANNED';
  backgroundCheck: 'PASSED' | 'FAILED' | 'PENDING';
  lastVisit?: string;
  nextScheduled?: string;
  biometricId: string;
  restrictions: string[];
}

export interface SystemMetrics {
  totalInmates: number;
  inmatesByThreatLevel: Record<string, number>;
  staffOnDuty: number;
  activeIncidents: number;
  criticalAlerts: number;
  lockdownStatus: boolean;
  capacityUtilization: number;
  securityLevel: 'NORMAL' | 'ELEVATED' | 'HIGH' | 'MAXIMUM';
  lastHeadcount: string;
  headcountAccuracy: number;
  systemIntegrity: number;
}