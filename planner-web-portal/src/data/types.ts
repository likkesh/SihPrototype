export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'Scheduled' | 'Approved' | 'Rejected';
export type Department = 'Engineering' | 'Signal & Telecom' | 'Traction Distribution';
export type TrainType = 'Passenger' | 'Express' | 'Goods';

export interface MaintenanceRequest {
  id: string;
  department: Department;
  asset: string;
  section: string;
  maintenanceType: string;
  priority: Priority;
  durationHours: number;
  requestedDate: string;
  status: Status;
  reason: string;
}

export interface TrainSchedule {
  id: string;
  trainNumber: string;
  trainName: string;
  section: string;
  arrival: string;
  departure: string;
  date: string;
  type: TrainType;
}

export interface BlockWindow {
  id: string;
  section: string;
  date: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  isAvailable: boolean;
  trainConflict: boolean;
}

export interface User {
  id: string;
  name: string;
  department: Department | 'All';
  role: 'Department Staff' | 'Planner' | 'Admin';
  status: 'Active' | 'Inactive';
}

export interface BlockPlan {
  id: string;
  section: string;
  date: string;
  startTime: string;
  endTime: string;
  departments: Department[];
  tasks: string[];
  status: 'AI Recommended' | 'Approved' | 'Rejected';
}
