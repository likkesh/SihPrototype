import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen flex bg-slate-900 font-sans">
      {/* Left side: Visuals/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-center px-16 text-white">
        {/* Abstract background graphics (using tailwind gradients instead of images to avoid broken links) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900 z-0 pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-800/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Train className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-wider">SMART RAIL</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight max-w-lg">
            AI-Powered Railway Maintenance & Block Planning
          </h1>
          <p className="text-slate-400 text-lg max-w-md">
            Optimize maintenance schedules, minimize train conflicts, and maximize track availability with our intelligent block planning system.
          </p>

          <div className="mt-12 pt-12 border-t border-slate-800 flex items-center text-slate-500 text-sm">
            <ShieldCheck className="w-5 h-5 mr-2" />
            Authorized Personnel Only
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          
          <div className="lg:hidden flex flex-col items-center text-center mb-10">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              <Train className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              SMART RAIL
            </h2>
            <p className="mt-2 text-sm text-slate-600 font-medium">
              AI-Powered Railway Maintenance & Block Planning
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
              <p className="text-slate-500 text-sm mt-1">Please sign in to access your dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Employee ID / Username
                </label>
                <Input 
                  type="text" 
                  defaultValue="emp_00123"
                  className="bg-slate-50 h-11"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  type="password" 
                  defaultValue="password123"
                  className="bg-slate-50 h-11"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Access Role
                </label>
                <select 
                  className="flex h-11 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={role as string}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  <option value="Planner">Control Office / Planner</option>
                  <option value="Admin">System Administrator</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Remember me on this device
                </label>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full text-base h-12 shadow-md shadow-blue-500/20">
                  Sign In
                </Button>
                <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Secure access for authorized railway personnel
                </p>
              </div>
            </form>
          </div>

          <div className="text-center text-xs font-medium text-slate-400">
            SIH 2026 Prototype
          </div>
        </div>
      </div>
    </div>
  );
}
