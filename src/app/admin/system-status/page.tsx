'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, AlertCircle, CheckCircle, Clock, 
  Cpu, Database, HardDrive, Wifi, Server, 
  RefreshCw, Settings, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Mock data for system status
const serverData = [
  { id: 1, name: 'Web Server 1', status: 'Active', uptime: '14d 2h 34m', cpu: 45, memory: 68, disk: 72 },
  { id: 2, name: 'Web Server 2', status: 'Active', uptime: '14d 1h 56m', cpu: 52, memory: 72, disk: 68 },
  { id: 3, name: 'API Server', status: 'Active', uptime: '12d 8h 12m', cpu: 38, memory: 62, disk: 58 },
  { id: 4, name: 'Database Server', status: 'Active', uptime: '21d 14h 45m', cpu: 42, memory: 58, disk: 82 },
  { id: 5, name: 'Redis Server', status: 'Active', uptime: '18d 6h 23m', cpu: 28, memory: 45, disk: 35 }
];

const servicesData = [
  { id: 1, name: 'Frontend Application', status: 'Active', responseTime: 124, requestsPerMinute: 1450 },
  { id: 2, name: 'API Service', status: 'Active', responseTime: 89, requestsPerMinute: 2100 },
  { id: 3, name: 'Database Connection', status: 'Active', responseTime: 45, requestsPerMinute: 1800 },
  { id: 4, name: 'Email Service', status: 'Active', responseTime: 156, requestsPerMinute: 450 },
  { id: 5, name: 'Payment Gateway', status: 'Active', responseTime: 210, requestsPerMinute: 320 },
  { id: 6, name: 'File Storage', status: 'Degraded', responseTime: 350, requestsPerMinute: 620 },
  { id: 7, name: 'Cache Service', status: 'Active', responseTime: 23, requestsPerMinute: 3400 }
];

const recentAlerts = [
  { id: 1, level: 'Warning', service: 'File Storage', message: 'High disk usage detected', time: '2 hours ago' },
  { id: 2, level: 'Info', service: 'API Service', message: 'Scheduled maintenance completed', time: '5 hours ago' },
  { id: 3, level: 'Error', service: 'Database Server', message: 'Connection timeout occurred', time: '1 day ago' },
  { id: 4, level: 'Warning', service: 'Web Server 2', message: 'High CPU usage detected', time: '1 day ago' },
  { id: 5, level: 'Info', service: 'Frontend Application', message: 'New deployment completed', time: '2 days ago' }
];

const AdminSystemStatusPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Degraded':
        return <Badge className="bg-yellow-500">Degraded</Badge>;
      case 'Offline':
        return <Badge className="bg-red-500">Offline</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const getAlertBadge = (level: string) => {
    switch (level) {
      case 'Info':
        return <Badge className="bg-blue-500">Info</Badge>;
      case 'Warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'Error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge className="bg-gray-500">{level}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">System Status</h1>
        <p className="text-gray-500">Monitor system performance and health</p>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            <Label htmlFor="auto-refresh">Auto Refresh</Label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="ghost">
            <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">System Status</CardTitle>
            <CardDescription className="text-gray-500">Overall system health</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">All Systems Operational</div>
                <p className="text-sm text-gray-500">Last checked: 2 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Active Servers</CardTitle>
            <CardDescription className="text-gray-500">Servers currently online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">5</div>
            <div className="text-sm text-gray-500">of 5 servers active</div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4">
            <Progress value={100} className="w-full" />
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Active Services</CardTitle>
            <CardDescription className="text-gray-500">Services currently running</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">6</div>
            <div className="text-sm text-gray-500">of 7 services active</div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4">
            <Progress value={85} className="w-full" />
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
            <CardDescription>Performance metrics for each server</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Server</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>CPU</TableHead>
                  <TableHead>Memory</TableHead>
                  <TableHead>Disk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><div className="animate-pulse h-4 w-32 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-12 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-12 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-12 bg-gray-700 rounded"></div></TableCell>
                    </TableRow>
                  ))
                ) : (
                  serverData.map(server => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell>{getStatusBadge(server.status)}</TableCell>
                      <TableCell>{server.uptime}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={server.cpu} className="w-20 mr-2" />
                          <span className="text-sm">{server.cpu}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={server.memory} className="w-20 mr-2" />
                          <span className="text-sm">{server.memory}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={server.disk} className="w-20 mr-2" />
                          <span className="text-sm">{server.disk}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Response time and request metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Requests/Min</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><div className="animate-pulse h-4 w-32 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                      <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    </TableRow>
                  ))
                ) : (
                  servicesData.map(service => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{getStatusBadge(service.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-sm">{service.responseTime}ms</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-sm">{service.requestsPerMinute}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>System alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-40 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-20 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                  </TableRow>
                ))
              ) : (
                recentAlerts.map(alert => (
                  <TableRow key={alert.id}>
                    <TableCell>{getAlertBadge(alert.level)}</TableCell>
                    <TableCell>{alert.service}</TableCell>
                    <TableCell>{alert.message}</TableCell>
                    <TableCell>{alert.time}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
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

export default AdminSystemStatusPage;