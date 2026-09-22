import { ShieldAlert, CalendarClock, Download, Filter } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useSharedData } from '../context/SharedDataContext';

export function BlockAvailabilityPage() {
  const { blocks } = useSharedData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Block Availability</h2>
          <p className="text-slate-500 mt-1">Track corridor availability and identify maintenance windows</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button variant="primary">Declare Window</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-emerald-50 border-emerald-100">
          <CardContent className="p-5 flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 mr-4">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-800">Total Available Windows</p>
              <h3 className="text-2xl font-bold text-emerald-900">{blocks.filter(b => b.isAvailable).length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-5 flex items-center">
            <div className="p-3 bg-red-100 rounded-lg text-red-600 mr-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Train Conflicts Detected</p>
              <h3 className="text-2xl font-bold text-red-900">{blocks.filter(b => b.trainConflict).length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Section / Corridor</TableHead>
                <TableHead className="font-semibold text-slate-600">Date</TableHead>
                <TableHead className="font-semibold text-slate-600">Window Period</TableHead>
                <TableHead className="font-semibold text-slate-600">Duration</TableHead>
                <TableHead className="font-semibold text-slate-600">Train Conflict</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map(block => (
                <TableRow key={block.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">{block.section}</TableCell>
                  <TableCell className="text-slate-600 font-medium">{block.date}</TableCell>
                  <TableCell className="text-slate-700 font-medium">{block.startTime} - {block.endTime}</TableCell>
                  <TableCell className="text-slate-600">{block.durationHours} hours</TableCell>
                  <TableCell>
                    {block.trainConflict ? (
                      <span className="inline-flex items-center text-red-600 font-medium text-sm">
                        <ShieldAlert className="w-4 h-4 mr-1.5" />
                        Conflict
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">Clear</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={block.isAvailable ? 'success' : 'danger'} className="uppercase text-[10px] tracking-wider px-2 py-0.5">
                      {block.isAvailable ? 'Available' : 'Occupied'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      View Timeline
                    </Button>
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
