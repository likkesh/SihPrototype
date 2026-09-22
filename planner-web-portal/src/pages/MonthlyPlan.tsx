import { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Filter, Download, Share, BrainCircuit 
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useSharedData } from '../context/SharedDataContext';
import { useNavigate } from 'react-router-dom';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate September 2026 calendar days
// Sept 2026 starts on Tuesday (Index 2)
// 30 days total
const MONTH_DAYS = Array.from({ length: 35 }, (_, i) => {
  if (i < 2 || i > 31) return null;
  return i - 1; // 1 to 30
});

export function MonthlyPlan() {
  const { plans } = useSharedData();
  const navigate = useNavigate();
  const [currentMonth] = useState('September 2026');

  // Filter plans for Sept 2026
  const monthlyPlans = plans.filter(p => p.date.startsWith('2026-09'));

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Conflict': return 'bg-red-100 text-red-800 border-red-200';
      case 'Completed': return 'bg-slate-200 text-slate-700 border-slate-300';
      case 'AI Recommended': return 'bg-indigo-100 text-indigo-800 border-indigo-200 border-dashed';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Monthly Block Plan</h2>
          <p className="text-slate-500 mt-1">High-level maintenance planning overview</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button variant="outline" size="sm"><Share className="w-4 h-4 mr-2" /> Publish</Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
            onClick={() => navigate('/planner/planner')}
          >
            <BrainCircuit className="w-4 h-4 mr-2" /> 
            Run AI Optimization
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Blocks" value={monthlyPlans.length} />
        <StatCard title="Approved" value={monthlyPlans.filter(p => p.status === 'Approved').length} color="text-green-600" />
        <StatCard title="Completed" value={monthlyPlans.filter(p => p.status === 'Completed').length} color="text-slate-600" />
        <StatCard title="Pending / Planned" value={monthlyPlans.filter(p => p.status === 'Planned' || p.status === 'AI Recommended').length} color="text-blue-600" />
        <StatCard title="Conflicts" value={monthlyPlans.filter(p => p.status === 'Conflict').length} color="text-red-600" />
        <StatCard title="Asset Avail." value="94%" color="text-emerald-600" />
      </div>

      {/* Main Calendar Board */}
      <Card className="flex-1 flex flex-col min-h-[700px]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="h-8 px-2"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm" className="h-8">Current Month</Button>
            <Button variant="outline" size="sm" className="h-8 px-2"><ChevronRight className="w-4 h-4" /></Button>
          </div>
          <div className="flex items-center font-bold text-lg text-slate-700">
            <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
            {currentMonth}
          </div>
        </div>
        
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Days of week Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-white">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="px-3 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-7 flex-1 bg-slate-100 gap-[1px]">
            {MONTH_DAYS.map((dateNum, idx) => {
              if (dateNum === null) {
                return <div key={`empty-${idx}`} className="bg-slate-50/50 min-h-[120px]"></div>;
              }
              
              const dateStr = `2026-09-${dateNum.toString().padStart(2, '0')}`;
              const dayPlans = monthlyPlans.filter(p => p.date === dateStr);
              
              return (
                <div key={dateNum} className="bg-white p-2 min-h-[120px] transition-colors hover:bg-blue-50/30 group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${dateNum === 10 ? 'bg-blue-600 text-white' : 'text-slate-700 group-hover:text-blue-600'}`}>
                      {dateNum}
                    </span>
                    {dayPlans.length > 0 && (
                      <span className="text-[10px] font-bold text-slate-400">{dayPlans.length} blocks</span>
                    )}
                  </div>
                  
                  <div className="space-y-1 mt-2">
                    {dayPlans.map(plan => (
                      <div 
                        key={plan.id}
                        className={`px-1.5 py-1 rounded text-[10px] font-medium leading-tight truncate border ${getStatusStyle(plan.status)} cursor-pointer hover:opacity-80`}
                        title={`${plan.startTime}-${plan.endTime}: ${plan.tasks[0]}`}
                      >
                        {plan.tasks[0]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, color = "text-slate-800" }: { title: string, value: string | number, color?: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
        <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{title}</p>
      </CardContent>
    </Card>
  );
}
