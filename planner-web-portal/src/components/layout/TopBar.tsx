import { useState, useRef, useEffect } from 'react';
import { Bell, Search, UserCircle, LogOut, ArrowLeftRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const pageTitles: Record<string, string> = {
  // Planner pages
  '/planner': 'Dashboard',
  '/planner/requests': 'Maintenance Requests',
  '/planner/trains': 'Train Schedule',
  '/planner/availability': 'Block Availability',
  '/planner/planner': 'AI Block Planner',
  '/planner/weekly': 'Weekly Plan',
  '/planner/monthly': 'Monthly Plan',
  '/planner/analytics': 'Analytics',
  '/planner/users': 'Users',
  '/planner/settings': 'Settings',
  
  // Admin pages
  '/admin': 'Admin Dashboard',
  '/admin/users': 'User Management',
  '/admin/master-data': 'Master Data',
  '/admin/monitoring': 'Block Monitoring',
  '/admin/alerts': 'Alerts & Conflicts',
  '/admin/analytics': 'Analytics & Reports',
  '/admin/audit': 'Audit Logs',
  '/admin/settings': 'System Settings',
};

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const title = pageTitles[location.pathname] || 'Overview';
  
  const isAdmin = role === 'Admin';
  const userName = isAdmin ? 'System Admin' : 'Planner Admin';
  const userRoleStr = isAdmin ? 'Administrator' : 'Planner';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
      <h1 className="text-xl font-semibold text-slate-800">
        {title}
      </h1>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-slate-50"
          />
        </div>
        
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center pl-4 border-l border-slate-200 cursor-pointer group"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <UserCircle className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <div className="ml-3 flex flex-col">
              <span className="text-sm font-medium text-slate-700">{userName}</span>
              <span className="text-xs text-slate-500">Role: {userRoleStr}</span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button 
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                onClick={handleLogout}
              >
                <ArrowLeftRight className="w-4 h-4 mr-2 text-slate-400" />
                Switch Role
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
