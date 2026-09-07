import { 
  Wrench, AlertTriangle, CalendarCheck, Clock, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { useSharedData } from '../context/SharedDataContext';

export function Dashboard() {
  const { requests, blocks, plans } = useSharedData();

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const criticalRequests = requests.filter(r => r.priority === 'Critical').length;
  const availableBlocks = blocks.filter(b => b.isAvailable).length;
  const scheduledBlocks = plans.length;
  const conflicts = blocks.filter(b => b.trainConflict).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Pending Requests" value={pendingRequests} icon={Clock} color="text-blue-600" />
        <StatCard title="Critical Maintenance" value={criticalRequests} icon={AlertTriangle} color="text-red-600" />
        <StatCard title="Available Blocks" value={availableBlocks} icon={CalendarCheck} color="text-green-600" />
        <StatCard title="Scheduled Blocks" value={scheduledBlocks} icon={Wrench} color="text-purple-600" />
        <StatCard title="Asset Availability" value="94%" icon={CheckCircle2} color="text-emerald-600" />
        <StatCard title="Train Conflicts" value={conflicts} icon={ShieldAlert} color="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Block Schedule */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Today's Block Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map(plan => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.startTime} - {plan.endTime}</TableCell>
                    <TableCell>{plan.section}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {plan.departments.map(dept => (
                          <Badge key={dept} variant="info">{dept}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={plan.status === 'Approved' ? 'success' : 'default'}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Department Requests Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Department Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Engineering', 'Signal & Telecom', 'Traction Distribution'].map(dept => {
                const count = requests.filter(r => r.department === dept && r.status === 'Pending').length;
                return (
                  <div key={dept} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-sm font-medium text-slate-700">{dept}</span>
                    <Badge variant="warning">{count} Pending</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Conflicts */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Conflicts & Warnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {blocks.filter(b => b.trainConflict).map(block => (
              <div key={block.id} className="flex items-start p-4 bg-red-50 text-red-900 rounded-lg border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">Train Movement Conflict in {block.section}</h4>
                  <p className="text-xs text-red-700 mt-1">
                    Requested block from {block.startTime} to {block.endTime} on {block.date} conflicts with scheduled train operations.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
