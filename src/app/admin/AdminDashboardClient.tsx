'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Activity,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  MapPin,
  MessageSquare
} from 'lucide-react';
// import Globe from '@/components/Globe';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AdminUsersPage from './users/page';
import AdminRevenuePage from './revenue/page';
import AdminCoursesPage from './courses/page';
import AdminCountriesPage from './countries/page';
import AdminAnalyticsPage from './analytics/page';
import AdminSystemStatusPage from './system-status/page';
import CommunityPage from '../community/page';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', users: 400, revenue: 2400, courses: 24 },
  { name: 'Feb', users: 300, revenue: 1398, courses: 22 },
  { name: 'Mar', users: 200, revenue: 9800, courses: 25 },
  { name: 'Apr', users: 278, revenue: 3908, courses: 28 },
  { name: 'May', users: 189, revenue: 4800, courses: 30 },
  { name: 'Jun', users: 239, revenue: 3800, courses: 29 },
  { name: 'Jul', users: 349, revenue: 4300, courses: 32 },
  { name: 'Aug', users: 420, revenue: 5400, courses: 35 },
  { name: 'Sep', users: 380, revenue: 4800, courses: 33 },
  { name: 'Oct', users: 450, revenue: 5900, courses: 36 },
  { name: 'Nov', users: 520, revenue: 6500, courses: 38 },
  { name: 'Dec', users: 600, revenue: 7200, courses: 40 }
];

const courseData = [
  { name: 'Full Stack Development', value: 400, color: '#00FF88' },
  { name: 'Cybersecurity', value: 300, color: '#0088FF' },
  { name: 'Data Science', value: 300, color: '#FF0088' },
  { name: 'Cloud Computing', value: 200, color: '#FF8800' },
  { name: 'Mobile Development', value: 278, color: '#8800FF' },
  { name: 'UI/UX Design', value: 189, color: '#00FFFF' }
];

const countryData = [
  { name: 'United States', users: 1200, revenue: 15000 },
  { name: 'India', users: 800, revenue: 8000 },
  { name: 'United Kingdom', users: 600, revenue: 12000 },
  { name: 'Germany', users: 500, revenue: 10000 },
  { name: 'Canada', users: 400, revenue: 9000 },
  { name: 'Australia', users: 300, revenue: 7500 },
  { name: 'Brazil', users: 250, revenue: 5000 },
  { name: 'Japan', users: 200, revenue: 8500 }
];

const recentUsers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', country: 'US', joinDate: '2023-11-01', courses: 3, status: 'Active' },
  { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', country: 'UK', joinDate: '2023-11-02', courses: 1, status: 'Active' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', country: 'CN', joinDate: '2023-11-03', courses: 5, status: 'Premium' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', country: 'US', joinDate: '2023-11-04', courses: 0, status: 'Inactive' },
  { id: 5, name: 'David Rodriguez', email: 'david@example.com', country: 'MX', joinDate: '2023-11-05', courses: 2, status: 'Active' }
];

const recentTransactions = [
  { id: 1, user: 'Alex Johnson', course: 'Full Stack Development', amount: 299, date: '2023-11-01', status: 'Completed' },
  { id: 2, user: 'Sarah Williams', course: 'UI/UX Design', amount: 199, date: '2023-11-02', status: 'Completed' },
  { id: 3, user: 'Michael Chen', course: 'Data Science', amount: 399, date: '2023-11-03', status: 'Pending' },
  { id: 4, user: 'Emily Davis', course: 'Cybersecurity', amount: 249, date: '2023-11-04', status: 'Completed' },
  { id: 5, user: 'David Rodriguez', course: 'Cloud Computing', amount: 279, date: '2023-11-05', status: 'Failed' }
];

const AdminDashboardClient = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin');
        if (response.ok) {
          const data = await response.json();
          // You would use this real data to update the dashboard
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRefreshTrigger(prev => prev + 1);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Premium':
        return <Badge className="bg-blue-500">Premium</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Main Content */}
      <main className="p-6">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">ADMIN DASHBOARD</h1>
              <Badge className="bg-green-500">ACTIVE</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search..." className="w-64 pl-9" />
            </div>
            
            <Button variant="ghost" size="icon" onClick={refreshData} title="Refresh Data">
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button variant="ghost" size="icon" title="Download Report">
              <Download className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Switch id="theme-toggle" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              <Label htmlFor="theme-toggle" className="sr-only">Theme Toggle</Label>
            </div>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                // Clear the admin login cookie and redirect to login page
                document.cookie = 'isAdminLoggedIn=; path=/admin; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                window.location.href = '/admin/login'
              }}
            >
              Logout
            </Button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <Tabs defaultValue="dashboard" className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-8 gap-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="countries" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="system-status" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              System Status
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Community
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,430</div>
                  <p className="text-xs text-gray-500">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-4 w-4" /> 12.5%
                    </span>
                    {' '}from last month
                  </p>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$456,230</div>
                  <p className="text-xs text-gray-500">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-4 w-4" /> 8.2%
                    </span>
                    {' '}from last month
                  </p>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <Clock className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-gray-500">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-4 w-4" /> 4.2%
                    </span>
                    {' '}from last month
                  </p>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,923</div>
                  <p className="text-xs text-gray-500">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-4 w-4" /> 15.3%
                    </span>
                    {' '}from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>User growth and revenue over the last 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00FF88" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0088FF" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0088FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="users" stroke="#00FF88" fillOpacity={1} fill="url(#colorUsers)" />
                        <Area type="monotone" dataKey="revenue" stroke="#0088FF" fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Course Enrollment Distribution</CardTitle>
                  <CardDescription>Number of students enrolled in each course category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={courseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {courseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Detailed Views */}
            <Tabs defaultValue="users" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="countries">Countries</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Recent Users</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button size="sm">Filter</Button>
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.country}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.courses}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Recent Transactions</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Search transactions..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.user}</TableCell>
                          <TableCell>{transaction.course}</TableCell>
                          <TableCell>${transaction.amount}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="countries" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">User Distribution by Country</h3>
                  <Button size="sm">Export Data</Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={countryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#00FF88" name="Users" />
                      <Bar dataKey="revenue" fill="#0088FF" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Server Health</CardTitle>
                  <CardDescription>System status and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>34%</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Disk Space</span>
                        <span>62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div className="flex items-center mt-4">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>All systems operating normally</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>API Performance</CardTitle>
                  <CardDescription>Request response times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { name: '00:00', response: 234 },
                        { name: '04:00', response: 187 },
                        { name: '08:00', response: 456 },
                        { name: '12:00', response: 678 },
                        { name: '16:00', response: 543 },
                        { name: '20:00', response: 321 },
                        { name: '24:00', response: 278 }
                      ]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Line type="monotone" dataKey="response" stroke="#00FF88" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Current active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <div className="text-3xl font-bold mb-2">1,342</div>
                      <p className="text-sm text-gray-500">Active users now</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-500/10 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Desktop</div>
                        <div className="text-lg font-medium">876</div>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Mobile</div>
                        <div className="text-lg font-medium">466</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-500">15% increase from last hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab Content */}
          <TabsContent value="users">
            <AdminUsersPage />
          </TabsContent>

          {/* Revenue Tab Content */}
          <TabsContent value="revenue">
            <AdminRevenuePage />
          </TabsContent>

          {/* Courses Tab Content */}
          <TabsContent value="courses">
            <AdminCoursesPage />
          </TabsContent>

          {/* Countries Tab Content */}
          <TabsContent value="countries">
            <AdminCountriesPage />
          </TabsContent>

          {/* Analytics Tab Content */}
          <TabsContent value="analytics">
            <AdminAnalyticsPage />
          </TabsContent>

          {/* System Status Tab Content */}
          <TabsContent value="system-status">
            <AdminSystemStatusPage />
          </TabsContent>

          {/* Community Tab Content */}
          <TabsContent value="community">
            <CommunityPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboardClient;
