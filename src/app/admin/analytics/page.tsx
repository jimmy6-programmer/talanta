'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, LineChart, PieChart, Activity, MapPin,
  Download, Filter, RefreshCw, TrendingUp, TrendingDown 
} from 'lucide-react';
import GlobeComponent from '@/components/Globe';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for analytics
const trafficSources = [
  { name: 'Organic Search', value: 45, color: '#00FF88' },
  { name: 'Direct', value: 25, color: '#0088FF' },
  { name: 'Social Media', value: 20, color: '#FF0088' },
  { name: 'Referral', value: 10, color: '#FF8800' }
];

const deviceData = [
  { name: 'Desktop', value: 65, color: '#00FF88' },
  { name: 'Mobile', value: 25, color: '#0088FF' },
  { name: 'Tablet', value: 10, color: '#FF0088' }
];

const engagementMetrics = [
  { metric: 'Bounce Rate', value: '42.5%', change: -2.3, description: 'From last month' },
  { metric: 'Average Session Duration', value: '3:45', change: 8.1, description: 'From last month' },
  { metric: 'Pages Per Session', value: '4.2', change: 5.4, description: 'From last month' },
  { metric: 'Conversion Rate', value: '3.8%', change: -1.2, description: 'From last month' }
];

const recentSessions = [
  { id: 1, user: 'Alex Johnson', source: 'Organic Search', duration: '4:23', pages: 5, conversion: 'Yes' },
  { id: 2, user: 'Sarah Williams', source: 'Direct', duration: '2:15', pages: 3, conversion: 'No' },
  { id: 3, user: 'Michael Chen', source: 'Social Media', duration: '6:47', pages: 7, conversion: 'Yes' },
  { id: 4, user: 'Emily Davis', source: 'Referral', duration: '3:12', pages: 4, conversion: 'No' },
  { id: 5, user: 'David Rodriguez', source: 'Organic Search', duration: '5:33', pages: 6, conversion: 'Yes' }
];

const AdminAnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('traffic');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-500">Detailed analytics and insights</p>
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

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="traffic">Traffic Sources</SelectItem>
              <SelectItem value="devices">Device Usage</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Total Sessions</CardTitle>
            <CardDescription className="text-gray-500">Current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">12,430</div>
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
            <CardTitle className="text-xl">New Users</CardTitle>
            <CardDescription className="text-gray-500">New user sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">3,450</div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>8.2% from last period</span>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4">
            <Progress value={65} className="w-full" />
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Bounce Rate</CardTitle>
            <CardDescription className="text-gray-500">Single-page sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">42.5%</div>
            <div className="flex items-center text-red-500">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span>2.3% from last period</span>
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-800 pt-4">
            <Progress value={42} className="w-full" />
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

      <Tabs defaultValue="locations" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="devices">Device Usage</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="locations">User Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Traffic Sources Distribution</CardTitle>
                <CardDescription>Where your users come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {/* Placeholder for chart - would use a library like Recharts */}
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <PieChart className="w-10 h-10 mr-2" />
                    <span>Traffic Sources Chart Placeholder</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Top Traffic Sources</CardTitle>
                <CardDescription>Breakdown by source type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: source.color }}
                        ></div>
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{source.value}%</div>
                        <div className="text-xs text-gray-500">of total traffic</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Device Usage Distribution</CardTitle>
                <CardDescription>Which devices your users use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {/* Placeholder for chart - would use a library like Recharts */}
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <BarChart3 className="w-10 h-10 mr-2" />
                    <span>Device Usage Chart Placeholder</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Percentage of usage by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: device.color }}
                        ></div>
                        <span className="font-medium">{device.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{device.value}%</div>
                        <div className="text-xs text-gray-500">of total traffic</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>How users interact with your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {engagementMetrics.map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{metric.metric}</span>
                        <div className="flex items-center">
                          <span className="font-bold mr-2">{metric.value}</span>
                          <Badge 
                            className={`${metric.change > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          >
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Latest user sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Pages</TableHead>
                      <TableHead>Conversion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSessions.map(session => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.user}</TableCell>
                        <TableCell>{session.source}</TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>{session.pages}</TableCell>
                        <TableCell>{session.conversion === 'Yes' ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey to conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {/* Placeholder for chart - would use a library like Recharts */}
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <Activity className="w-10 h-10 mr-2" />
                    <span>Conversion Funnel Chart Placeholder</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
                <CardDescription>Key conversion indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold mb-1">3.8%</div>
                    <div className="text-sm text-gray-500">Overall conversion rate</div>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg">
                    <div className="text-2xl font-bold mb-1">4.2%</div>
                    <div className="text-sm text-gray-500">Mobile conversion rate</div>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg">
                    <div className="text-2xl font-bold mb-1">5.1%</div>
                    <div className="text-sm text-gray-500">Desktop conversion rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
              <CardHeader>
                <CardTitle>User Locations</CardTitle>
                <CardDescription>Global distribution of users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 overflow-hidden rounded-lg">
                  <GlobeComponent height="100%" width="100%" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Users by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'United States', users: 4250, percentage: 34.2 },
                    { name: 'India', users: 2890, percentage: 23.3 },
                    { name: 'United Kingdom', users: 1560, percentage: 12.6 },
                    { name: 'Germany', users: 1240, percentage: 10.0 },
                    { name: 'Brazil', users: 980, percentage: 7.9 },
                    { name: 'Australia', users: 640, percentage: 5.2 },
                    { name: 'Other', users: 870, percentage: 7.0 }
                  ].map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium">{country.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{country.users.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{country.percentage}% of total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalyticsPage;