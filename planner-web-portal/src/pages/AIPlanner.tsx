import { useState } from 'react';
import { 
  BrainCircuit, CheckCircle2, Play, Settings2, Loader2, RefreshCw, Clock, 
  ArrowRight, ShieldCheck, Cpu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useSharedData } from '../context/SharedDataContext';
import { Modal } from '../components/ui/Modal';
import type { BlockPlan } from '../data/types';

const SIMULATION_STEPS = [
  "Aggregating Maintenance Requests...",
  "Analyzing Train Schedules & Network Constraints...",
  "Identifying Feasible Block Windows...",
  "Executing OR-Tools Resource Optimization...",
  "Generating Final Block Plan...",
];

export function AIPlanner() {
  const { requests, blocks, plans, setPlans } = useSharedData();
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  const [reviewModalPlan, setReviewModalPlan] = useState<BlockPlan | null>(null);

  const handleGenerate = () => {
    setIsSimulating(true);
    setHasGenerated(false);
    setSimulationStep(0);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < SIMULATION_STEPS.length) {
        setSimulationStep(currentStep);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setHasGenerated(true);
      }
    }, 1200);
  };

  const handleApprove = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    setReviewModalPlan(null);
  };

  const handleReject = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
    setReviewModalPlan(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">AI Block Planner Engine</h2>
          <p className="text-slate-500 mt-1 max-w-3xl">
            Generate optimized maintenance blocks using operational constraints, train schedules, resource availability and maintenance priorities.
          </p>
        </div>
        
        <Button 
          variant="primary" 
          size="lg" 
          className="shadow-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 transition-all border-0 rounded-full px-8"
          onClick={handleGenerate}
          disabled={isSimulating}
        >
          {isSimulating ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Cpu className="w-5 h-5 mr-2" />
          )}
          Run OR-Tools Optimization
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Architecture Overview / Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-md overflow-hidden border-0 ring-1 ring-slate-200">
            <div className="bg-slate-900 px-5 py-4 text-white">
              <div className="flex items-center space-x-2">
                <Settings2 className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-lg tracking-wide">Data Inputs</h3>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <InputRow label="Maintenance Requests" value={requests.filter(r => r.status === 'Pending').length} active />
                <InputRow label="Train Schedules" value="124" active />
                <InputRow label="Corridor Availability" value={blocks.filter(b => b.isAvailable).length} active />
                <InputRow label="Operational Rules" value="Active" />
                <InputRow label="Resource Constraints" value="Active" />
              </div>
            </CardContent>
          </Card>

          {/* Engine Card */}
          <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BrainCircuit className="w-48 h-48" />
            </div>
            <CardContent className="p-8 relative z-10 flex flex-col items-center text-center">
              <div className={`p-4 bg-white/10 rounded-2xl backdrop-blur-md mb-6 ${isSimulating ? 'animate-pulse' : ''}`}>
                <BrainCircuit className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold tracking-wide mb-2">OR-Tools Optimizer</h3>
              <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                Minimizing downtime while adhering to complex railway operational constraints.
              </p>
              <div className="w-full bg-white/10 rounded-lg p-4 flex justify-between items-center text-sm font-medium">
                <span className="text-indigo-200">Engine Status:</span>
                {isSimulating ? (
                  <span className="text-amber-400 flex items-center">
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Processing
                  </span>
                ) : hasGenerated ? (
                  <span className="text-emerald-400 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Idle (Complete)
                  </span>
                ) : (
                  <span className="text-slate-300">Ready</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-8">
          <Card className="h-full border-0 shadow-md ring-1 ring-slate-200 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between rounded-t-xl">
              <h3 className="font-semibold text-lg text-slate-800">Optimization Results</h3>
              {hasGenerated && (
                <Badge variant="success" className="px-3 py-1 font-semibold shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Plan Validated
                </Badge>
              )}
            </div>
            
            <CardContent className="p-8 flex-1 flex flex-col">
              
              {!isSimulating && !hasGenerated && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <ArrowRight className="w-10 h-10 transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Awaiting Optimization</h3>
                  <p className="text-slate-500 max-w-md">
                    Initialize the AI engine to generate an optimal block schedule based on the provided inputs on the left.
                  </p>
                </div>
              )}

              {isSimulating && (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-wide">Processing Model</h3>
                  <p className="text-blue-600 font-medium text-lg animate-pulse mb-8">{SIMULATION_STEPS[simulationStep]}</p>
                  
                  <div className="w-full max-w-lg bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-[1200ms] ease-out rounded-full"
                      style={{ width: `${((simulationStep + 1) / SIMULATION_STEPS.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {!isSimulating && hasGenerated && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <ResultMetric title="Blocks Created" value="4" />
                    <ResultMetric title="Conflicts Avoided" value="100%" color="text-emerald-600" />
                    <ResultMetric title="Maint. Hours" value="18" />
                    <ResultMetric title="Planning Time" value="4.8s" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Generated Block Schedule</h4>
                    {plans.filter(p => p.status === 'AI Recommended').map(plan => (
                      <div key={plan.id} className="group border border-blue-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-blue-50/50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-bold text-slate-900">{plan.section}</h4>
                              <Badge variant="info" className="bg-blue-100 text-blue-800 border-blue-200 uppercase tracking-wider text-[10px]">AI Draft</Badge>
                            </div>
                            <div className="flex items-center text-slate-600 text-sm font-medium">
                              <CalendarClock className="w-4 h-4 mr-2 text-slate-400" />
                              {plan.date} • {plan.startTime} - {plan.endTime}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Consolidated Tasks</p>
                            <div className="flex flex-wrap gap-2">
                              {plan.tasks.map((t, i) => (
                                <Badge key={i} variant="default" className="bg-white border-slate-200 text-slate-700 shadow-sm">{t}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="shrink-0 flex gap-2">
                            <Button 
                              variant="outline" 
                              className="bg-white border-slate-200 hover:bg-slate-50"
                              onClick={() => setReviewModalPlan(plan)}
                            >
                              Review Details
                            </Button>
                            <Button 
                              variant="primary"
                              onClick={() => handleApprove(plan.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={!!reviewModalPlan}
        onClose={() => setReviewModalPlan(null)}
        title="Review AI Block Plan"
        footer={
          <>
            <Button variant="danger" onClick={() => handleReject(reviewModalPlan!.id)}>Reject Plan</Button>
            <div className="flex-1"></div>
            <Button variant="outline" onClick={() => setReviewModalPlan(null)}>Cancel</Button>
            <Button variant="primary" onClick={() => handleApprove(reviewModalPlan!.id)}>Approve Block</Button>
          </>
        }
      >
        {reviewModalPlan && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-xl flex items-start shadow-sm">
              <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
              <p className="text-sm font-medium leading-relaxed">
                This block plan was generated by OR-Tools. It combines maintenance tasks from multiple departments to minimize downtime. 0 train conflicts detected for this window.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Plan ID</p>
                <p className="font-bold text-slate-900">{reviewModalPlan.id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Section</p>
                <p className="font-bold text-slate-900">{reviewModalPlan.section}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Time Window</p>
                <p className="font-bold text-slate-900">{reviewModalPlan.startTime} - {reviewModalPlan.endTime}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</p>
                <p className="font-bold text-slate-900">{reviewModalPlan.date}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-700 mb-2">Tasks to be Executed</p>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <ul className="space-y-3">
                  {reviewModalPlan.tasks.map((task, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-3"></div>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function InputRow({ label, value, active }: { label: string, value: string | number, active?: boolean }) {
  return (
    <div className="flex justify-between items-center py-4 px-5 hover:bg-slate-50 transition-colors">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className={`font-bold text-sm px-2.5 py-1 rounded-full ${active ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
        {value}
      </span>
    </div>
  );
}

function ResultMetric({ title, value, color = "text-slate-800" }: { title: string, value: string, color?: string }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
      <h3 className={`text-2xl font-black ${color} tracking-tight`}>{value}</h3>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">{title}</p>
    </div>
  );
}

// Ensure CalendarClock is imported
import { CalendarClock } from 'lucide-react';
