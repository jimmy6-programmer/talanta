'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Filter, Download, Plus, Eye, EyeOff, Ban, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for users
const usersData = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', country: 'US', joinDate: '2023-11-01', courses: 3, status: 'Active' },
  { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', country: 'UK', joinDate: '2023-11-02', courses: 1, status: 'Active' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', country: 'CN', joinDate: '2023-11-03', courses: 5, status: 'Premium' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', country: 'US', joinDate: '2023-11-04', courses: 0, status: 'Inactive' },
  { id: 5, name: 'David Rodriguez', email: 'david@example.com', country: 'MX', joinDate: '2023-11-05', courses: 2, status: 'Active' },
  { id: 6, name: 'Maria Garcia', email: 'maria@example.com', country: 'ES', joinDate: '2023-11-06', courses: 4, status: 'Premium' },
  { id: 7, name: 'James Wilson', email: 'james@example.com', country: 'GB', joinDate: '2023-11-07', courses: 1, status: 'Active' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', country: 'CA', joinDate: '2023-11-08', courses: 3, status: 'Inactive' },
  { id: 9, name: 'Robert Brown', email: 'robert@example.com', country: 'AU', joinDate: '2023-11-09', courses: 6, status: 'Premium' },
  { id: 10, name: 'Jennifer Lee', email: 'jennifer@example.com', country: 'SG', joinDate: '2023-11-10', courses: 2, status: 'Active' }
];

const AdminUsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState(usersData);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleToggleAllSelection = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleExport = () => {
    console.log('Exporting selected users:', selectedUsers);
  };

  const handleAddUser = () => {
    console.log('Adding new user');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Premium':
        return <Badge className="bg-blue-500">Premium</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Users</h1>
        <p className="text-gray-500">Manage user accounts and permissions</p>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedUsers.length > 0 && (
            <Button variant="secondary" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Selected
            </Button>
          )}
          <Button onClick={handleAddUser}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <div className="flex items-center">
                    <Switch
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleToggleAllSelection}
                      className="mr-2"
                    />
                  </div>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><div className="animate-pulse h-4 w-4 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-32 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-40 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-20 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-10 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                  </TableRow>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleToggleUserSelection(user.id)}
                          className="mr-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.courses}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {user.status === 'Active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {!isLoading && filteredUsers.length > 0 && (
          <CardFooter className="flex justify-between items-center border-t border-gray-800 px-6 py-4">
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" disabled>
                Previous
              </Button>
              <Button variant="ghost" size="sm" disabled>
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AdminUsersPage;