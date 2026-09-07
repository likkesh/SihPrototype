import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Database,
  Activity,
  AlertTriangle,
  BarChart3,
  ShieldCheck,
  Settings,
  Train
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'User Management', path: '/admin/users', icon: Users },
  { name: 'Master Data', path: '/admin/master-data', icon: Database },
  { name: 'Block Monitoring', path: '/admin/monitoring', icon: Activity },
  { name: 'Alerts & Conflicts', path: '/admin/alerts', icon: AlertTriangle },
  { name: 'Analytics & Reports', path: '/admin/analytics', icon: BarChart3 },
  { name: 'Audit Logs', path: '/admin/audit', icon: ShieldCheck },
  { name: 'System Settings', path: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <Train className="w-6 h-6 text-emerald-400 mr-2" />
        <span className="font-semibold text-lg text-white tracking-wide">ADMIN PORTAL</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-emerald-600 text-white" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-3 flex-shrink-0", isActive ? "text-emerald-200" : "text-slate-400")} />
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
