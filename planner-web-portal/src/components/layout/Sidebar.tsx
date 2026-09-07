import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  Wrench, 
  Train, 
  CalendarClock, 
  BrainCircuit, 
  CalendarDays, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/planner', icon: LayoutDashboard },
  { name: 'Maintenance Requests', path: '/planner/requests', icon: Wrench },
  { name: 'Train Schedule', path: '/planner/trains', icon: Train },
  { name: 'Block Availability', path: '/planner/availability', icon: CalendarClock },
  { name: 'AI Block Planner', path: '/planner/planner', icon: BrainCircuit },
  { name: 'Weekly Plan', path: '/planner/weekly', icon: CalendarDays },
  { name: 'Monthly Plan', path: '/planner/monthly', icon: Calendar },
  { name: 'Analytics', path: '/planner/analytics', icon: BarChart3 },
  { name: 'Users', path: '/planner/users', icon: Users },
  { name: 'Settings', path: '/planner/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <Train className="w-6 h-6 text-blue-400 mr-2" />
        <span className="font-semibold text-lg text-white tracking-wide">RAIL PLANNER</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/planner' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-3 flex-shrink-0", isActive ? "text-blue-200" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        &copy; 2026 SIH Prototype
      </div>
    </aside>
  );
}
