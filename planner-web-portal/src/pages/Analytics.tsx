import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useSharedData } from '../context/SharedDataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Download, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function AnalyticsPage() {
  const { requests, plans } = useSharedData();

  // Mock data calculations
  const deptData = [
    { name: 'Engineering', count: requests.filter(r => r.department === 'Engineering').length },
    { name: 'Signal', count: requests.filter(r => r.department === 'Signal & Telecom').length },
    { name: 'Traction', count: requests.filter(r => r.department === 'Traction Distribution').length },
  ];

  const statusData = [
    { name: 'Completed', value: plans.filter(p => p.status === 'Completed').length, color: '#10b981' }, // emerald-500
    { name: 'Approved', value: plans.filter(p => p.status === 'Approved').length, color: '#3b82f6' }, // blue-500
    { name: 'Pending/Planned', value: plans.filter(p => p.status === 'Planned' || p.status === 'AI Recommended').length, color: '#f59e0b' }, // amber-500
  ];

  // Trend data mock
  const trendData = [
    { name: 'Sep 1', requests: 12, completed: 8 },
    { name: 'Sep 5', requests: 15, completed: 10 },
    { name: 'Sep 10', requests: 18, completed: 14 },
    { name: 'Sep 15', requests: 14, completed: 12 },
    { name: 'Sep 20', requests: 20, completed: 18 },
    { name: 'Sep 25', requests: 17, completed: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics & Reports</h2>
          <p className="text-slate-500 mt-1">Key performance indicators for maintenance operations</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-md px-3 py-1.5 mr-2">
            <CalendarIcon className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-sm text-slate-600 font-medium">September 2026</span>
          </div>
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button variant="primary"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Planning Efficiency" value="87%" trend="+5%" trendUp />
        <SummaryCard title="Avg. Block Duration" value="3.2 hrs" trend="-0.4 hrs" trendUp />
        <SummaryCard title="Conflicts Avoided" value="12" trend="+3" trendUp />
        <SummaryCard title="Asset Availability" value="94.5%" trend="+1.2%" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <Card className="shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <CardTitle className="text-slate-700">Maintenance Requests Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="requests" name="Total Requests" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="completed" name="Completed Works" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <CardTitle className="text-slate-700">Requests by Department</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <CardTitle className="text-slate-700">Block Implementation Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <CardTitle className="text-slate-700">Top Maintenance Hotspots</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { section: 'Section A - Track 2', count: 12, severity: 'High' },
                { section: 'Section C - Bridge 5', count: 8, severity: 'Medium' },
                { section: 'Section B - Signal Box 3', count: 7, severity: 'High' },
                { section: 'Section D - OHE Line 1', count: 5, severity: 'Medium' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 hover:bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800">{item.section}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.count} interventions this month</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function SummaryCard({ title, value, trend, trendUp }: { title: string, value: string, trend: string, trendUp: boolean }) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-5">
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
          <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
