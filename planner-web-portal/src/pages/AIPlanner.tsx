import { useState } from 'react';
import { BrainCircuit, CheckCircle2, Play, Settings2, FileBarChart, Loader2, RefreshCw, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useSharedData } from '../context/SharedDataContext';
import { Modal } from '../components/ui/Modal';
import type { BlockPlan } from '../data/types';

const SIMULATION_STEPS = [
  "Collecting maintenance requests...",
  "Checking train schedules and conflicts...",
  "Evaluating available block windows...",
  "Optimizing maintenance task combinations (OR-Tools)...",
  "Generating feasible block schedule...",
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
    
    // Simulate steps
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < SIMULATION_STEPS.length) {
        setSimulationStep(currentStep);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setHasGenerated(true);
        // Simulation complete, the shared plans state remains to be interacted with
      }
    }, 800);
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
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Automatic Block Planning</h2>
          <p className="text-slate-500 mt-1">AI-powered optimization engine for scheduling maintenance blocks</p>
        </div>
        
        <Button 
          variant="primary" 
          size="lg" 
          className="shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all border-0"
          onClick={handleGenerate}
          disabled={isSimulating}
        >
          {isSimulating ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <BrainCircuit className="w-5 h-5 mr-2" />
          )}
          Generate Optimized Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Parameters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings2 className="w-5 h-5 mr-2 text-slate-500" />
              Optimization Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputSummaryItem label="Pending Requests" value={requests.filter(r => r.status === 'Pending').length} />
            <InputSummaryItem label="Critical Tasks" value={requests.filter(r => r.priority === 'Critical' && r.status === 'Pending').length} />
            <InputSummaryItem label="Available Block Windows" value={blocks.filter(b => b.isAvailable).length} />
            <InputSummaryItem label="Total Train Operations" value="124 Today" />
            <InputSummaryItem label="Optimization Engine" value="OR-Tools Solver" highlight />
          </CardContent>
        </Card>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {isSimulating && (
            <Card className="border-blue-200 bg-blue-50/50 shadow-sm">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <BrainCircuit className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Simulating Optimization</h3>
                <p className="text-blue-600 font-medium animate-pulse">{SIMULATION_STEPS[simulationStep]}</p>
                <div className="w-full max-w-md bg-slate-200 h-2 rounded-full mt-6 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${((simulationStep + 1) / SIMULATION_STEPS.length) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isSimulating && !hasGenerated && (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300 text-center min-h-[300px]">
              <div className="p-4 bg-slate-50 rounded-full mb-4">
                <Play className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to Optimize</h3>
              <p className="text-slate-500 max-w-md">
                Click "Generate Optimized Plan" to run the OR-Tools solver against current maintenance requests, train schedules, and block windows.
              </p>
            </div>
          )}

          {!isSimulating && hasGenerated && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Summary Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <MetricCard title="Tasks Scheduled" value="12" sub="of 15 pending" />
                <MetricCard title="Tasks Combined" value="5" sub="Into 7 blocks" />
                <MetricCard title="Conflicts Avoided" value="100%" sub="0 train delays" />
              </div>

              {/* Generated Plans */}
              <div className="space-y-4">
                {plans.map(plan => (
                  <Card key={plan.id} className={plan.status === 'AI Recommended' ? 'border-blue-200 ring-1 ring-blue-500/20' : ''}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        
                        <div className="p-6 flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-slate-800">{plan.section}</h4>
                            <Badge 
                              variant={
                                plan.status === 'Approved' ? 'success' : 
                                plan.status === 'Rejected' ? 'danger' : 'info'
                              }
                            >
                              {plan.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-slate-600 mb-4 bg-slate-50 w-fit px-3 py-1.5 rounded-md border border-slate-100">
                            <Clock className="w-4 h-4 mr-2 text-slate-400" />
                            <span className="font-medium">{plan.startTime} - {plan.endTime}</span>
                            <span className="mx-2">•</span>
                            <span>{plan.date}</span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Departments Combined</p>
                              <div className="flex flex-wrap gap-2">
                                {plan.departments.map(dept => (
                                  <Badge key={dept} variant="default" className="bg-slate-100">{dept}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Tasks</p>
                              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                                {plan.tasks.map((task, i) => <li key={i}>{task}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 md:w-64 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center space-y-3 shrink-0">
                          <Button 
                            variant="primary" 
                            className="w-full"
                            onClick={() => setReviewModalPlan(plan)}
                          >
                            Review & Approve
                          </Button>
                          <Button variant="outline" className="w-full">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Modify
                          </Button>
                        </div>
                        
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!reviewModalPlan}
        onClose={() => setReviewModalPlan(null)}
        title="Review Optimized Plan"
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
            <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-lg flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
              <p className="text-sm">
                This block plan was automatically generated by the AI optimization engine. It combines maintenance tasks from multiple departments to minimize overall track downtime. No train conflicts were detected for this window.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-slate-500">Plan ID</p>
                <p className="font-medium text-slate-900">{reviewModalPlan.id}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Section</p>
                <p className="font-medium text-slate-900">{reviewModalPlan.section}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Time</p>
                <p className="font-medium text-slate-900">{reviewModalPlan.startTime} - {reviewModalPlan.endTime}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Date</p>
                <p className="font-medium text-slate-900">{reviewModalPlan.date}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-700 mb-2">Tasks to be Executed</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <ul className="space-y-2 text-sm">
                  {reviewModalPlan.tasks.map((task, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="font-medium">{task}</span>
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

function InputSummaryItem({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 last:pb-0">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`font-semibold text-sm ${highlight ? 'text-blue-600 bg-blue-50 px-2 py-0.5 rounded' : 'text-slate-800'}`}>
        {value}
      </span>
    </div>
  );
}

function MetricCard({ title, value, sub }: { title: string, value: string, sub: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
      <FileBarChart className="w-5 h-5 text-indigo-500 mb-2" />
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{title}</p>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </div>
  );
}
