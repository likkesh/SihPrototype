import { Card, CardContent } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { useSharedData } from '../context/SharedDataContext';

export function UsersPage() {
  const { users } = useSharedData();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">User Management</h2>
          <p className="text-slate-500 mt-1">Manage system access and roles</p>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Name</TableHead>
                <TableHead className="font-semibold text-slate-600">Department</TableHead>
                <TableHead className="font-semibold text-slate-600">Role</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                  <TableCell className="text-slate-600">{user.department}</TableCell>
                  <TableCell className="text-slate-600">{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'success' : 'default'} className="px-2 py-0.5">
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
      <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
        <CardContent className="p-16 text-center text-slate-500">
          <p className="text-lg font-medium">{desc}</p>
        </CardContent>
      </Card>
    </div>
  );
}
