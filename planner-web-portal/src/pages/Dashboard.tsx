import { 
  Wrench, AlertTriangle, CalendarCheck, Clock, CheckCircle2, ShieldAlert,
  ArrowRight, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { useSharedData } from '../context/SharedDataContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function Dashboard() {
  const { requests, blocks, plans } = useSharedData();

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const criticalRequests = requests.filter(r => r.priority === 'Critical').length;
  const availableBlocks = blocks.filter(b => b.isAvailable).length;
  
  // Plans for today
  const todaysPlans = plans.filter(p => p.date === '2026-09-10' || p.id.includes('W1-4') || p.id.includes('W1-5'));

  const conflicts = blocks.filter(b => b.trainConflict).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Control Office Dashboard</h2>
          <p className="text-slate-500 mt-1">Real-time overview of maintenance operations and track blocks</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <Activity className="w-4 h-4 text-emerald-500 mr-2 animate-pulse" />
          System Status: <span className="font-semibold text-emerald-600 ml-1">Optimal</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Pending Requests" value={pendingRequests} icon={Clock} color="text-amber-600" bgColor="bg-amber-100" />
        <StatCard title="Critical Maintenance" value={criticalRequests} icon={AlertTriangle} color="text-red-600" bgColor="bg-red-100" />
        <StatCard title="Available Corridors" value={availableBlocks} icon={CalendarCheck} color="text-emerald-600" bgColor="bg-emerald-100" />
        <StatCard title="Today's Blocks" value={todaysPlans.length} icon={Wrench} color="text-blue-600" bgColor="bg-blue-100" />
        <StatCard title="Asset Availability" value="94.2%" icon={CheckCircle2} color="text-indigo-600" bgColor="bg-indigo-100" />
        <StatCard title="Train Conflicts" value={conflicts} icon={ShieldAlert} color="text-rose-600" bgColor="bg-rose-100" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Block Schedule */}
        <Card className="xl:col-span-2 flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-slate-50 flex flex-row items-center justify-between rounded-t-xl">
            <CardTitle className="text-slate-800">Today's Scheduled Blocks</CardTitle>
            <Link to="/planner/weekly">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 h-8">
                View Weekly Plan <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">Time Window</TableHead>
                  <TableHead className="font-semibold text-slate-600">Section</TableHead>
                  <TableHead className="font-semibold text-slate-600">Departments</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaysPlans.map(plan => (
                  <TableRow key={plan.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-bold text-slate-700">
                      {plan.startTime} - {plan.endTime}
                    </TableCell>
                    <TableCell className="font-medium text-slate-800">{plan.section}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {plan.departments.map(dept => (
                          <Badge key={dept} variant="default" className="text-[10px] tracking-wider uppercase">{dept}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={
                        plan.status === 'Approved' ? 'success' : 
                        plan.status === 'In Progress' ? 'warning' : 'info'
                      } className="px-2 py-0.5">
                        {plan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {todaysPlans.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                      No blocks scheduled for today.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Department Requests Summary */}
          <Card>
            <CardHeader className="border-b border-slate-100 bg-slate-50 rounded-t-xl">
              <CardTitle className="text-slate-800">Pending Requests by Dept</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                {['Engineering', 'Signal & Telecom', 'Traction Distribution'].map(dept => {
                  const count = requests.filter(r => r.department === dept && r.status === 'Pending').length;
                  return (
                    <div key={dept} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-blue-200 transition-colors cursor-pointer">
                      <span className="text-sm font-semibold text-slate-700">{dept}</span>
                      <Badge variant={count > 3 ? 'warning' : 'default'} className="font-bold">
                        {count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Conflicts */}
          <Card>
            <CardHeader className="border-b border-slate-100 bg-red-50/50 rounded-t-xl">
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-3">
                {blocks.filter(b => b.trainConflict).map(block => (
                  <div key={block.id} className="flex items-start p-3 bg-red-50 text-red-900 rounded-lg border border-red-100">
                    <div>
                      <h4 className="text-sm font-bold">Conflict in {block.section}</h4>
                      <p className="text-xs text-red-700 mt-1 font-medium leading-relaxed">
                        Requested block ({block.startTime}-{block.endTime}) on {block.date} conflicts with scheduled train operations.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bgColor }: { title: string, value: string | number, icon: any, color: string, bgColor: string }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight mb-1">{value}</h3>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
