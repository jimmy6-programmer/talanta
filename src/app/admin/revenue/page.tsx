'use client';

import { useState, useEffect } from 'react';
import { 
  DollarSign, BarChart3, LineChart, PieChart, 
  Download, Filter, RefreshCw, TrendingUp, TrendingDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for revenue
const revenueData = [
  { month: 'Jan', amount: 32400, courses: 156, users: 240 },
  { month: 'Feb', amount: 38200, courses: 189, users: 285 },
  { month: 'Mar', amount: 41800, courses: 204, users: 312 },
  { month: 'Apr', amount: 35600, courses: 169, users: 258 },
  { month: 'May', amount: 45200, courses: 221, users: 340 },
  { month: 'Jun', amount: 51300, courses: 248, users: 385 },
  { month: 'Jul', amount: 48700, courses: 235, users: 362 },
  { month: 'Aug', amount: 55900, courses: 268, users: 415 },
  { month: 'Sep', amount: 52400, courses: 253, users: 398 },
  { month: 'Oct', amount: 58700, courses: 281, users: 436 },
  { month: 'Nov', amount: 61200, courses: 295, users: 462 },
  { month: 'Dec', amount: 67800, courses: 324, users: 506 }
];

const courseRevenueData = [
  { name: 'Full Stack Development', amount: 185000, users: 342, completionRate: 85 },
  { name: 'Cybersecurity', amount: 142000, users: 278, completionRate: 78 },
  { name: 'Data Science', amount: 156000, users: 298, completionRate: 82 },
  { name: 'Cloud Computing', amount: 123000, users: 234, completionRate: 75 },
  { name: 'Mobile Development', amount: 98000, users: 189, completionRate: 70 },
  { name: 'UI/UX Design', amount: 85000, users: 167, completionRate: 68 }
];

const recentTransactions = [
  { id: 1, user: 'Alex Johnson', course: 'Full Stack Development', amount: 299, date: '2023-11-01', status: 'Completed' },
  { id: 2, user: 'Sarah Williams', course: 'UI/UX Design', amount: 199, date: '2023-11-02', status: 'Completed' },
  { id: 3, user: 'Michael Chen', course: 'Data Science', amount: 399, date: '2023-11-03', status: 'Pending' },
  { id: 4, user: 'Emily Davis', course: 'Cybersecurity', amount: 249, date: '2023-11-04', status: 'Completed' },
  { id: 5, user: 'David Rodriguez', course: 'Cloud Computing', amount: 279, date: '2023-11-05', status: 'Failed' }
];

const AdminRevenuePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('year');
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'Failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Revenue</h1>
        <p className="text-gray-500">Track and analyze revenue metrics</p>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="full-stack">Full Stack Development</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
              <SelectItem value="mobile-dev">Mobile Development</SelectItem>
              <SelectItem value="ui-ux">UI/UX Design</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="ghost">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Total Revenue</CardTitle>
            <CardDescription className="text-gray-500">Current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$612,580</div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12.5% from last period</span>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4">
            <Progress value={78} className="w-full" />
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Average Course Price</CardTitle>
            <CardDescription className="text-gray-500">Per course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$289</div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>5.2% from last period</span>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4">
            <Progress value={65} className="w-full" />
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Conversion Rate</CardTitle>
            <CardDescription className="text-gray-500">Visitors to customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">3.8%</div>
            <div className="flex items-center text-red-500">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span>1.2% from last period</span>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4">
            <Progress value={38} className="w-full" />
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Revenue by Month</CardTitle>
            <CardDescription>Monthly revenue trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {/* Placeholder for chart - would use a library like Recharts */}
              <div className="flex items-center justify-center h-full text-gray-500">
                <BarChart3 className="w-10 h-10 mr-2" />
                <span>Revenue Chart Placeholder</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Revenue by Course</CardTitle>
            <CardDescription>Distribution of revenue by course category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {/* Placeholder for chart - would use a library like Recharts */}
              <div className="flex items-center justify-center h-full text-gray-500">
                <PieChart className="w-10 h-10 mr-2" />
                <span>Revenue Chart Placeholder</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest revenue transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><div className="animate-pulse h-4 w-32 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-40 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-20 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                  </TableRow>
                ))
              ) : (
                recentTransactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.user}</TableCell>
                    <TableCell>{transaction.course}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRevenuePage;