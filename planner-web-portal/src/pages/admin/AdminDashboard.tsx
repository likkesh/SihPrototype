import { useSharedData } from '../../context/SharedDataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { FileText, Clock, CheckCircle, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '../../components/ui/Badge';

export function AdminDashboard() {
  const { requests, plans, alerts } = useSharedData();

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const approvedBlocks = plans.filter(p => p.status === 'Approved').length;
  const activeConflicts = alerts.filter(a => a.severity === 'HIGH' && a.status === 'Active').length;

  const blockStatusData = [
    { name: 'Completed', value: 45, color: '#10b981' }, // Green
    { name: 'In Progress', value: 20, color: '#3b82f6' }, // Blue
    { name: 'Approved', value: approvedBlocks, color: '#f59e0b' }, // Amber
    { name: 'Pending', value: pendingRequests, color: '#94a3b8' }, // Slate
  ];

  const deptRequestsData = [
    { name: 'Engineering', count: requests.filter(r => r.department === 'Engineering').length },
    { name: 'Signal & Telecom', count: requests.filter(r => r.department === 'Signal & Telecom').length },
    { name: 'Traction', count: requests.filter(r => r.department === 'Traction Distribution').length },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Requests" value={requests.length} icon={FileText} color="text-indigo-600" />
        <StatCard title="Pending Requests" value={pendingRequests} icon={Clock} color="text-amber-600" />
        <StatCard title="Approved Blocks" value={approvedBlocks} icon={CheckCircle} color="text-blue-600" />
        <StatCard title="Active Conflicts" value={activeConflicts} icon={ShieldAlert} color="text-red-600" />
        <StatCard title="Completed Maint." value="90" icon={CheckCircle2} color="text-emerald-600" />
        <StatCard title="Asset Availability" value="94%" icon={TrendingUp} color="text-teal-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Block Status Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Block Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={blockStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {blockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dept Requests */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Department-wise Requests</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptRequestsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="lg:col-span-1 border-red-100 shadow-sm">
          <CardHeader className="bg-red-50/50 rounded-t-xl border-b border-red-100">
            <CardTitle className="text-red-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {alerts.slice(0, 4).map(alert => (
              <div key={alert.id} className="flex items-start bg-white p-3 rounded border border-slate-100 shadow-sm">
                <Badge 
                  variant={alert.severity === 'HIGH' ? 'danger' : alert.severity === 'MEDIUM' ? 'warning' : 'info'} 
                  className="mr-3 mt-0.5"
                >
                  {alert.severity}
                </Badge>
                <div>
                  <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                  {alert.section && <p className="text-xs text-slate-500 mt-1">{alert.section}</p>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem time="10:30" text="Block request approved by Planner Admin" />
            <ActivityItem time="09:45" text="New user added to Traction Distribution" />
            <ActivityItem time="09:20" text="Conflict detected in Section B operations" isWarning />
            <ActivityItem time="08:50" text="Monthly report generated successfully" />
            <ActivityItem time="08:30" text="System settings updated" />
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
          <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ time, text, isWarning = false }: { time: string, text: string, isWarning?: boolean }) {
  return (
    <div className="flex items-start">
      <div className="w-16 flex-shrink-0 text-sm font-medium text-slate-400 pt-0.5">{time}</div>
      <div className="relative flex-1 pb-4 border-l-2 border-slate-100 pl-4">
        <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${isWarning ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
        <p className={`text-sm ${isWarning ? 'text-amber-800 font-medium' : 'text-slate-700'}`}>{text}</p>
      </div>
    </div>
  );
}
