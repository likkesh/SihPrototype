import { useState, useMemo } from 'react';
import { Search, Filter, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useSharedData } from '../context/SharedDataContext';
import type { MaintenanceRequest } from '../data/types';

export function Requests() {
  const { requests } = useSharedData();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchSearch = req.id.toLowerCase().includes(search.toLowerCase()) || 
                          req.asset.toLowerCase().includes(search.toLowerCase()) ||
                          req.maintenanceType.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === 'All' || req.department === deptFilter;
      const matchPriority = priorityFilter === 'All' || req.priority === priorityFilter;
      const matchStatus = statusFilter === 'All' || req.status === statusFilter;
      return matchSearch && matchDept && matchPriority && matchStatus;
    });
  }, [search, deptFilter, priorityFilter, statusFilter]);

  const getPriorityVariant = (priority: string) => {
    switch(priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'default';
    }
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Pending': return 'warning';
      case 'Scheduled': return 'info';
      case 'Approved': return 'success';
      case 'Rejected': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Maintenance Requests</CardTitle>
            <Button variant="primary">
              <Wrench className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Search ID, Asset, Type..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Signal & Telecom">Signal & Telecom</option>
                <option value="Traction Distribution">Traction Distribution</option>
              </select>
              
              <select 
                className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              
              <select 
                className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map(req => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.department}</TableCell>
                  <TableCell>{req.asset}</TableCell>
                  <TableCell>{req.maintenanceType}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(req.priority)}>{req.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(req.status)}>{req.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(req)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No maintenance requests found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal 
        isOpen={!!selectedRequest} 
        onClose={() => setSelectedRequest(null)}
        title={`Request Details: ${selectedRequest?.id}`}
        footer={
          <>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>Close</Button>
            <Button variant="primary">Edit Request</Button>
          </>
        }
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Department</p>
                <p className="font-medium text-slate-900">{selectedRequest.department}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Asset & Location</p>
                <p className="font-medium text-slate-900">{selectedRequest.asset} ({selectedRequest.section})</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Requested Date</p>
                <p className="font-medium text-slate-900">{selectedRequest.requestedDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Duration Required</p>
                <p className="font-medium text-slate-900">{selectedRequest.durationHours} hours</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Maintenance Type</p>
              <p className="font-medium text-slate-900">{selectedRequest.maintenanceType}</p>
            </div>
            
            <div>
              <p className="text-sm text-slate-500 mb-1">Reason for Maintenance</p>
              <div className="bg-slate-50 p-3 rounded-md border border-slate-100 mt-1">
                <p className="text-sm text-slate-700">{selectedRequest.reason}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-sm text-slate-500 mb-2">Priority</p>
                <Badge variant={getPriorityVariant(selectedRequest.priority)}>{selectedRequest.priority}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">Current Status</p>
                <Badge variant={getStatusVariant(selectedRequest.status)}>{selectedRequest.status}</Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
