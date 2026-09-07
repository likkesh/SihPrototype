import type { MaintenanceRequest, TrainSchedule, BlockWindow, User, BlockPlan } from './types';

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  { id: 'REQ-001', department: 'Engineering', asset: 'Track 2A', section: 'Section A', maintenanceType: 'Track replacement', priority: 'Critical', durationHours: 4, requestedDate: '2026-09-10', status: 'Pending', reason: 'Severe wear detected' },
  { id: 'REQ-002', department: 'Signal & Telecom', asset: 'Signal 12B', section: 'Section A', maintenanceType: 'Calibration', priority: 'High', durationHours: 2, requestedDate: '2026-09-10', status: 'Pending', reason: 'Routine check' },
  { id: 'REQ-003', department: 'Traction Distribution', asset: 'OHE Line 4', section: 'Section B', maintenanceType: 'Insulator replacement', priority: 'Medium', durationHours: 3, requestedDate: '2026-09-11', status: 'Pending', reason: 'Scheduled maintenance' },
  { id: 'REQ-004', department: 'Engineering', asset: 'Bridge 5', section: 'Section C', maintenanceType: 'Structural inspection', priority: 'Low', durationHours: 5, requestedDate: '2026-09-12', status: 'Scheduled', reason: 'Annual inspection' },
  { id: 'REQ-005', department: 'Signal & Telecom', asset: 'Point Machine 7', section: 'Section B', maintenanceType: 'Overhaul', priority: 'High', durationHours: 3, requestedDate: '2026-09-11', status: 'Approved', reason: 'Failure report' },
  { id: 'REQ-006', department: 'Engineering', asset: 'Track 1B', section: 'Section D', maintenanceType: 'Ballast cleaning', priority: 'Medium', durationHours: 6, requestedDate: '2026-09-15', status: 'Pending', reason: 'Regular maintenance' },
  { id: 'REQ-007', department: 'Traction Distribution', asset: 'Substation 2', section: 'Section A', maintenanceType: 'Transformer check', priority: 'Critical', durationHours: 4, requestedDate: '2026-09-10', status: 'Pending', reason: 'Voltage drop reported' },
  { id: 'REQ-008', department: 'Signal & Telecom', asset: 'Relay Room 1', section: 'Section C', maintenanceType: 'Wiring update', priority: 'Low', durationHours: 2, requestedDate: '2026-09-14', status: 'Rejected', reason: 'Not urgent, deferred' },
  { id: 'REQ-009', department: 'Engineering', asset: 'Level Crossing 3', section: 'Section A', maintenanceType: 'Surface repair', priority: 'High', durationHours: 3, requestedDate: '2026-09-10', status: 'Pending', reason: 'Public complaint' },
  { id: 'REQ-010', department: 'Traction Distribution', asset: 'Catenary Wire', section: 'Section D', maintenanceType: 'Tension adjustment', priority: 'Medium', durationHours: 2, requestedDate: '2026-09-12', status: 'Pending', reason: 'Seasonal check' },
];

export const mockTrainSchedule: TrainSchedule[] = [
  { id: 'TR-12001', trainNumber: '12001', trainName: 'Shatabdi Express', section: 'Section A', arrival: '08:00', departure: '08:05', date: '2026-09-10', type: 'Express' },
  { id: 'TR-12002', trainNumber: '12002', trainName: 'Shatabdi Express', section: 'Section A', arrival: '18:00', departure: '18:05', date: '2026-09-10', type: 'Express' },
  { id: 'TR-54011', trainNumber: '54011', trainName: 'Local Passenger', section: 'Section B', arrival: '09:30', departure: '09:45', date: '2026-09-10', type: 'Passenger' },
  { id: 'TR-54012', trainNumber: '54012', trainName: 'Local Passenger', section: 'Section B', arrival: '14:30', departure: '14:45', date: '2026-09-10', type: 'Passenger' },
  { id: 'TR-89001', trainNumber: '89001', trainName: 'Freight Carrier', section: 'Section C', arrival: '11:00', departure: '11:30', date: '2026-09-10', type: 'Goods' },
  { id: 'TR-89002', trainNumber: '89002', trainName: 'Freight Carrier', section: 'Section A', arrival: '22:00', departure: '22:15', date: '2026-09-10', type: 'Goods' },
  { id: 'TR-12951', trainNumber: '12951', trainName: 'Rajdhani Express', section: 'Section D', arrival: '20:00', departure: '20:10', date: '2026-09-10', type: 'Express' },
  { id: 'TR-12952', trainNumber: '12952', trainName: 'Rajdhani Express', section: 'Section C', arrival: '06:00', departure: '06:10', date: '2026-09-10', type: 'Express' },
  { id: 'TR-56789', trainNumber: '56789', trainName: 'Intercity', section: 'Section A', arrival: '13:00', departure: '13:10', date: '2026-09-10', type: 'Passenger' },
  { id: 'TR-98765', trainNumber: '98765', trainName: 'Coal Freight', section: 'Section B', arrival: '02:00', departure: '02:30', date: '2026-09-11', type: 'Goods' },
];

export const mockBlockWindows: BlockWindow[] = [
  { id: 'BW-001', section: 'Section A', date: '2026-09-10', startTime: '10:00', endTime: '14:00', durationHours: 4, isAvailable: true, trainConflict: false },
  { id: 'BW-002', section: 'Section A', date: '2026-09-10', startTime: '14:30', endTime: '17:30', durationHours: 3, isAvailable: false, trainConflict: true },
  { id: 'BW-003', section: 'Section B', date: '2026-09-10', startTime: '10:00', endTime: '14:00', durationHours: 4, isAvailable: true, trainConflict: false },
  { id: 'BW-004', section: 'Section C', date: '2026-09-10', startTime: '12:00', endTime: '16:00', durationHours: 4, isAvailable: true, trainConflict: false },
  { id: 'BW-005', section: 'Section D', date: '2026-09-10', startTime: '08:00', endTime: '12:00', durationHours: 4, isAvailable: false, trainConflict: true },
  { id: 'BW-006', section: 'Section A', date: '2026-09-11', startTime: '09:00', endTime: '13:00', durationHours: 4, isAvailable: true, trainConflict: false },
];

export const mockUsers: User[] = [
  { id: 'U-001', name: 'Rahul Sharma', department: 'All', role: 'Admin', status: 'Active' },
  { id: 'U-002', name: 'Priya Patel', department: 'All', role: 'Planner', status: 'Active' },
  { id: 'U-003', name: 'Amit Kumar', department: 'Engineering', role: 'Department Staff', status: 'Active' },
  { id: 'U-004', name: 'Sneha Gupta', department: 'Signal & Telecom', role: 'Department Staff', status: 'Active' },
  { id: 'U-005', name: 'Vikram Singh', department: 'Traction Distribution', role: 'Department Staff', status: 'Inactive' },
];

export const mockGeneratedPlans: BlockPlan[] = [
  {
    id: 'BP-2026-001',
    section: 'Section A',
    date: '2026-09-10',
    startTime: '10:00',
    endTime: '14:00',
    departments: ['Engineering', 'Traction Distribution'],
    tasks: ['Track replacement', 'Transformer check', 'Surface repair'],
    status: 'AI Recommended'
  },
  {
    id: 'BP-2026-002',
    section: 'Section B',
    date: '2026-09-10',
    startTime: '10:00',
    endTime: '13:00',
    departments: ['Signal & Telecom'],
    tasks: ['Calibration', 'Point Machine Overhaul'],
    status: 'Approved'
  }
];
