import { Search, Filter, Download } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useSharedData } from '../context/SharedDataContext';

export function TrainSchedulePage() {
  const { trains } = useSharedData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Train Schedule</h2>
          <p className="text-slate-500 mt-1">Master timetable for all scheduled train operations</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button variant="primary">Add Special Train</Button>
        </div>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50 rounded-t-xl">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search train number or name..." 
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="bg-white"><Filter className="w-4 h-4 mr-2" /> Section</Button>
            <Button variant="outline" className="bg-white"><Filter className="w-4 h-4 mr-2" /> Type</Button>
          </div>
        </div>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Train Number</TableHead>
                <TableHead className="font-semibold text-slate-600">Train Name</TableHead>
                <TableHead className="font-semibold text-slate-600">Type</TableHead>
                <TableHead className="font-semibold text-slate-600">Section</TableHead>
                <TableHead className="font-semibold text-slate-600">Arrival</TableHead>
                <TableHead className="font-semibold text-slate-600">Departure</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trains.map(train => (
                <TableRow key={train.id} className="hover:bg-slate-50/50 cursor-pointer">
                  <TableCell className="font-bold text-slate-700">{train.trainNumber}</TableCell>
                  <TableCell className="font-medium text-slate-800">{train.trainName}</TableCell>
                  <TableCell>
                    <Badge variant={train.type === 'Express' ? 'info' : train.type === 'Goods' ? 'warning' : 'default'} className="uppercase text-[10px] tracking-wider px-2 py-0.5">
                      {train.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{train.section}</TableCell>
                  <TableCell className="text-slate-600 font-medium">{train.arrival}</TableCell>
                  <TableCell className="text-slate-600 font-medium">{train.departure}</TableCell>
                  <TableCell>
                    <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">On Time</Badge>
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
