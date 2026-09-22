import { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Filter, Download, Share, BrainCircuit, RefreshCw
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useSharedData } from '../context/SharedDataContext';
import { useNavigate } from 'react-router-dom';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DATES = ['Sep 07', 'Sep 08', 'Sep 09', 'Sep 10', 'Sep 11', 'Sep 12', 'Sep 13'];

export function WeeklyPlan() {
  const { plans } = useSharedData();
  const navigate = useNavigate();
  const [currentWeek] = useState('Sep 07 - Sep 13, 2026');

  // Filter plans for this week (using the mock data range we set)
  const weeklyPlans = plans.filter(p => p.id.includes('W1') || p.date.startsWith('2026-09-0') || p.date.startsWith('2026-09-1'));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 border-green-300 text-green-800';
      case 'Planned': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Conflict': return 'bg-red-100 border-red-300 text-red-800';
      case 'Completed': return 'bg-slate-200 border-slate-300 text-slate-800';
      case 'AI Recommended': return 'bg-indigo-100 border-indigo-300 text-indigo-800 border-dashed';
      default: return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Weekly Block Plan</h2>
          <p className="text-slate-500 mt-1">Detailed operational view for the current week</p>
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

      <div className="flex flex-col xl:flex-row gap-6 flex-1">
        
        {/* Main Calendar Board */}
        <Card className="flex-1 flex flex-col min-h-[600px]">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="h-8 px-2"><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" className="h-8">Today</Button>
              <Button variant="outline" size="sm" className="h-8 px-2"><ChevronRight className="w-4 h-4" /></Button>
            </div>
            <div className="flex items-center font-semibold text-slate-700">
              <CalendarIcon className="w-5 h-5 mr-2 text-slate-400" />
              {currentWeek}
            </div>
          </div>
          
          <CardContent className="p-0 flex-1 overflow-auto">
            <div className="min-w-[800px] h-full flex flex-col">
              {/* Days Header */}
              <div className="grid grid-cols-7 border-b border-slate-200 bg-white">
                {DAYS.map((day, idx) => (
                  <div key={day} className="px-3 py-3 border-r border-slate-100 last:border-r-0 text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{day}</p>
                    <p className="text-lg font-bold text-slate-700 mt-0.5">{DATES[idx]}</p>
                  </div>
                ))}
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-7 flex-1 bg-slate-50/50">
                {DAYS.map((day, dayIdx) => {
                  const dateStr = `2026-09-0${dayIdx + 7}`.replace('010', '10').replace('011', '11').replace('012', '12').replace('013', '13');
                  const dayPlans = weeklyPlans.filter(p => p.date === dateStr);
                  
                  return (
                    <div key={day} className="border-r border-slate-200 last:border-r-0 p-2 space-y-2 min-h-[500px]">
                      {dayPlans.map(plan => (
                        <div 
                          key={plan.id}
                          className={`p-2.5 rounded-lg border text-sm shadow-sm transition-all hover:shadow-md cursor-pointer ${getStatusColor(plan.status)}`}
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <span className="font-bold text-xs">{plan.startTime} - {plan.endTime}</span>
                          </div>
                          <p className="font-semibold text-sm leading-tight mb-1">{plan.tasks[0]}</p>
                          <p className="text-xs opacity-80 mb-2">{plan.section} • {plan.departments[0]}</p>
                          <span className="inline-block px-1.5 py-0.5 bg-white/50 rounded text-[10px] font-bold uppercase tracking-wide">
                            {plan.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary Sidebar */}
        <div className="w-full xl:w-80 space-y-6 shrink-0">
          <Card>
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
              <h3 className="font-semibold text-slate-800">Weekly Summary</h3>
            </div>
            <CardContent className="p-5">
              <div className="space-y-4">
                <SummaryRow label="Total Blocks" value={weeklyPlans.length} />
                <SummaryRow label="Approved" value={weeklyPlans.filter(p => p.status === 'Approved').length} color="text-green-600" />
                <SummaryRow label="Pending / Planned" value={weeklyPlans.filter(p => p.status === 'Planned' || p.status === 'AI Recommended').length} color="text-blue-600" />
                <SummaryRow label="Completed" value={weeklyPlans.filter(p => p.status === 'Completed').length} color="text-slate-600" />
                <SummaryRow label="Conflicts" value={weeklyPlans.filter(p => p.status === 'Conflict').length} color="text-red-600" />
                
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600">Asset Availability</span>
                    <span className="font-bold text-slate-800">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full h-12 border-dashed border-2 text-slate-500 hover:text-slate-800">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync from TMS/SMMS
          </Button>
        </div>
        
      </div>
    </div>
  );
}

function SummaryRow({ label, value, color = "text-slate-800" }: { label: string, value: number, color?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}
