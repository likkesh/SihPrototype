import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { useSharedData } from '../context/SharedDataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function TrainSchedulePage() {
  const { trains } = useSharedData();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Train Schedule</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Train Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trains.map(train => (
                <TableRow key={train.id}>
                  <TableCell className="font-medium">{train.trainNumber}</TableCell>
                  <TableCell>{train.trainName}</TableCell>
                  <TableCell>{train.section}</TableCell>
                  <TableCell>{train.arrival}</TableCell>
                  <TableCell>{train.departure}</TableCell>
                  <TableCell>
                    <Badge variant={train.type === 'Express' ? 'info' : train.type === 'Goods' ? 'warning' : 'default'}>
                      {train.type}
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

export function BlockAvailabilityPage() {
  const { blocks } = useSharedData();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Block Availability</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Window</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Train Conflict</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map(block => (
                <TableRow key={block.id}>
                  <TableCell className="font-medium">{block.section}</TableCell>
                  <TableCell>{block.date}</TableCell>
                  <TableCell>{block.startTime} - {block.endTime}</TableCell>
                  <TableCell>{block.durationHours} hrs</TableCell>
                  <TableCell>
                    {block.trainConflict ? <span className="text-red-500 font-medium">Yes</span> : <span className="text-green-500">No</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={block.isAvailable ? 'success' : 'danger'}>
                      {block.isAvailable ? 'Available' : 'Unavailable'}
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

export function AnalyticsPage() {
  const data = [
    { name: 'Engineering', count: 4 },
    { name: 'Signal & Telecom', count: 3 },
    { name: 'Traction', count: 3 },
  ];


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Requests by Department</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Block Utilization</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ name: 'Utilized', value: 35 }, { name: 'Available', value: 65 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#cbd5e1" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function UsersPage() {
  const { users } = useSharedData();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">User Management</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'success' : 'default'}>
                      {user.status}
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

export function SimplePlaceholderPage({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
      <Card>
        <CardContent className="p-12 text-center text-slate-500">
          <p className="text-lg">{desc}</p>
        </CardContent>
      </Card>
    </div>
  );
}
