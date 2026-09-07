import { createContext, useContext, useState, type ReactNode } from 'react';
import type { 
  MaintenanceRequest, 
  TrainSchedule, 
  BlockWindow, 
  User, 
  BlockPlan 
} from '../data/types';
import { 
  mockMaintenanceRequests, 
  mockTrainSchedule, 
  mockBlockWindows, 
  mockUsers, 
  mockGeneratedPlans 
} from '../data/mockData';

export interface Alert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'INFO';
  message: string;
  section?: string;
  date: string;
  status: 'Active' | 'Resolved';
}

const mockAlerts: Alert[] = [
  { id: 'AL-1', severity: 'HIGH', message: 'Train movement conflict', section: 'Section A', date: '2026-09-10 09:20', status: 'Active' },
  { id: 'AL-2', severity: 'HIGH', message: 'Overlapping maintenance blocks', section: 'Section B', date: '2026-09-10 10:15', status: 'Active' },
  { id: 'AL-3', severity: 'MEDIUM', message: 'Critical maintenance still pending', section: 'Section C', date: '2026-09-10 08:30', status: 'Active' },
  { id: 'AL-4', severity: 'INFO', message: 'Monthly report generated', date: '2026-09-01 00:00', status: 'Active' },
];

interface SharedDataContextType {
  requests: MaintenanceRequest[];
  setRequests: React.Dispatch<React.SetStateAction<MaintenanceRequest[]>>;
  trains: TrainSchedule[];
  setTrains: React.Dispatch<React.SetStateAction<TrainSchedule[]>>;
  blocks: BlockWindow[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockWindow[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  plans: BlockPlan[];
  setPlans: React.Dispatch<React.SetStateAction<BlockPlan[]>>;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

export function SharedDataProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockMaintenanceRequests);
  const [trains, setTrains] = useState<TrainSchedule[]>(mockTrainSchedule);
  const [blocks, setBlocks] = useState<BlockWindow[]>(mockBlockWindows);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [plans, setPlans] = useState<BlockPlan[]>(mockGeneratedPlans);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  return (
    <SharedDataContext.Provider 
      value={{ 
        requests, setRequests, 
        trains, setTrains, 
        blocks, setBlocks, 
        users, setUsers, 
        plans, setPlans,
        alerts, setAlerts
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
}

export function useSharedData() {
  const context = useContext(SharedDataContext);
  if (context === undefined) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }
  return context;
}
