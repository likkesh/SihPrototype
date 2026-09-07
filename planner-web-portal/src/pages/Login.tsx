import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../context/AuthContext';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('Planner');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    if (role === 'Planner') {
      navigate('/planner');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <Train className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            RAIL PLANNER
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 font-medium">
            Smart Railway Maintenance & Block Planning<br/>
            <span className="text-slate-400">AI-Powered Block Planning for Indian Railways</span>
          </p>
        </div>

        <Card className="border-0 shadow-xl shadow-slate-200/50">
          <CardContent className="pt-8 px-8 pb-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email / Username
                </label>
                <Input 
                  type="text" 
                  defaultValue="demo@railplanner.in"
                  className="bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <Input 
                  type="password" 
                  defaultValue="password123"
                  className="bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={role as string}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  <option value="Planner">Planner</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full text-base h-11">
                  LOGIN
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-400 mt-8">
          SIH 2026 Prototype
        </p>
      </div>
    </div>
  );
}
