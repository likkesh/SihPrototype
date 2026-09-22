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

const navigationGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', path: '/planner', icon: LayoutDashboard, exact: true },
    ]
  },
  {
    title: 'Operations',
    items: [
      { name: 'Maintenance Requests', path: '/planner/requests', icon: Wrench },
      { name: 'Train Schedule', path: '/planner/trains', icon: Train },
      { name: 'Block Availability', path: '/planner/availability', icon: CalendarClock },
    ]
  },
  {
    title: 'AI Planning',
    items: [
      { name: 'AI Block Planner', path: '/planner/planner', icon: BrainCircuit },
      { name: 'Weekly Plan', path: '/planner/weekly', icon: CalendarDays },
      { name: 'Monthly Plan', path: '/planner/monthly', icon: Calendar },
    ]
  },
  {
    title: 'Reports',
    items: [
      { name: 'Analytics', path: '/planner/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Administration',
    items: [
      { name: 'Users', path: '/planner/users', icon: Users },
      { name: 'Settings', path: '/planner/settings', icon: Settings },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 shrink-0 shadow-xl z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0 bg-slate-950/50">
        <Train className="w-6 h-6 text-blue-500 mr-2.5" />
        <span className="font-bold text-lg text-white tracking-wide">SMART RAIL</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <nav className="space-y-6 px-3">
          {navigationGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.exact 
                    ? location.pathname === item.path 
                    : location.pathname.startsWith(item.path);
                    
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
                        isActive 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <item.icon className={cn(
                        "w-5 h-5 mr-3 flex-shrink-0 transition-colors", 
                        isActive ? "text-blue-200" : "text-slate-400 group-hover:text-slate-200"
                      )} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 bg-slate-900">
        <div className="font-medium text-slate-400 mb-1">SMART RAIL Control</div>
        &copy; 2026 SIH Prototype
      </div>
    </aside>
  );
}
