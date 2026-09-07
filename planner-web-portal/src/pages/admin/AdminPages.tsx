import { useSharedData } from '../../context/SharedDataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function AdminMasterData() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Master Data</h2>
      <div className="flex border-b border-slate-200 mb-4">
        {['Tracks', 'Sections', 'Assets', 'Departments', 'Train Information'].map((tab, i) => (
          <button key={i} className={`px-4 py-2 font-medium text-sm border-b-2 ${i === 1 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Track Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['Section A', 'Section B', 'Section C', 'Section D'].map((sec, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">SEC-00{i+1}</TableCell>
                  <TableCell>{sec}</TableCell>
                  <TableCell>Double Line, Broad Gauge</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminMonitoring() {
  const { plans } = useSharedData();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Block Monitoring</h2>
      <Card>
        <CardHeader>
          <CardTitle>Current & Historical Blocks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Block ID</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Departments</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map(plan => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium text-blue-600">{plan.id}</TableCell>
                  <TableCell>{plan.section}</TableCell>
                  <TableCell>{plan.departments.join(', ')}</TableCell>
                  <TableCell>{plan.date} {plan.startTime}</TableCell>
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
    </div>
  );
}

export function AdminAlerts() {
  const { alerts, setAlerts } = useSharedData();
  
  const handleResolve = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Alerts & Conflicts</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map(alert => (
                <TableRow key={alert.id} className={alert.status === 'Active' ? 'bg-slate-50/50' : 'opacity-60'}>
                  <TableCell>
                    <Badge variant={alert.severity === 'HIGH' ? 'danger' : alert.severity === 'MEDIUM' ? 'warning' : 'info'}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{alert.message}</TableCell>
                  <TableCell>{alert.section || '-'}</TableCell>
                  <TableCell>{alert.date}</TableCell>
                  <TableCell>
                    {alert.status === 'Resolved' ? (
                      <span className="text-sm font-medium text-green-600">Resolved</span>
                    ) : (
                      <span className="text-sm font-medium text-red-600">Active</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {alert.status === 'Active' && (
                      <Button variant="outline" size="sm" onClick={() => handleResolve(alert.id)}>Mark Resolved</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics & Reports</h2>
        <div className="space-x-3">
          <Button variant="outline">Generate Weekly Report</Button>
          <Button variant="primary">Generate Monthly Report</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-12 text-center text-slate-500">
          <p>Extended analytical charts and detailed reports generation interface.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminAudit() {
  const mockLogs = [
    { time: '10:30:15', user: 'Planner Admin', action: 'Approved Block BP-2026-001', module: 'Block Planning', status: 'Success' },
    { time: '09:45:00', user: 'System Admin', action: 'Added user USR005', module: 'User Management', status: 'Success' },
    { time: '09:20:11', user: 'System', action: 'Detected train conflict TR-12002', module: 'Monitoring', status: 'Warning' },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Audit Logs</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs">{log.time}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.module}</TableCell>
                  <TableCell>
                    <span className={log.status === 'Success' ? 'text-green-600' : 'text-amber-600'}>{log.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Global Configurations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Enable Email Notifications</p>
              <p className="text-sm text-slate-500">Send emails for high priority alerts and approved blocks.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Auto-Detect Conflicts</p>
              <p className="text-sm text-slate-500">Run background checks every 5 minutes against COA data.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-800">Maintenance Reminders</p>
              <p className="text-sm text-slate-500">Notify department staff 24 hours before scheduled blocks.</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
