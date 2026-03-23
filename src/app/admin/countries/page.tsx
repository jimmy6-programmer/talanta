'use client';

import { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Download, RefreshCw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for countries
const countriesData = [
  { id: 1, name: 'United States', users: 1200, revenue: 15000, courses: 24, status: 'Active' },
  { id: 2, name: 'India', users: 800, revenue: 8000, courses: 18, status: 'Active' },
  { id: 3, name: 'United Kingdom', users: 600, revenue: 12000, courses: 22, status: 'Active' },
  { id: 4, name: 'Germany', users: 500, revenue: 10000, courses: 20, status: 'Active' },
  { id: 5, name: 'Canada', users: 400, revenue: 9000, courses: 19, status: 'Active' },
  { id: 6, name: 'Australia', users: 300, revenue: 7500, courses: 17, status: 'Active' },
  { id: 7, name: 'Brazil', users: 250, revenue: 5000, courses: 15, status: 'Active' },
  { id: 8, name: 'Japan', users: 200, revenue: 8500, courses: 18, status: 'Active' },
  { id: 9, name: 'France', users: 180, revenue: 7000, courses: 16, status: 'Active' },
  { id: 10, name: 'Italy', users: 150, revenue: 6000, courses: 14, status: 'Active' },
  { id: 11, name: 'Spain', users: 130, revenue: 5500, courses: 13, status: 'Active' },
  { id: 12, name: 'Netherlands', users: 120, revenue: 6500, courses: 15, status: 'Active' },
  { id: 13, name: 'Sweden', users: 100, revenue: 5800, courses: 14, status: 'Active' },
  { id: 14, name: 'Norway', users: 90, revenue: 6200, courses: 14, status: 'Active' },
  { id: 15, name: 'Denmark', users: 80, revenue: 5300, courses: 13, status: 'Active' }
];

const AdminCountriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countries, setCountries] = useState(countriesData);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCountries = countries.filter(country => {
    const matchesSearch = !searchTerm || 
      country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || country.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleCountrySelection = (countryId: number) => {
    setSelectedCountries(prev => 
      prev.includes(countryId) 
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };

  const handleToggleAllSelection = () => {
    if (selectedCountries.length === filteredCountries.length) {
      setSelectedCountries([]);
    } else {
      setSelectedCountries(filteredCountries.map(country => country.id));
    }
  };

  const handleExport = () => {
    console.log('Exporting selected countries:', selectedCountries);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Countries</h1>
        <p className="text-gray-500">User and revenue distribution by country</p>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search countries..."
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
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedCountries.length > 0 && (
            <Button variant="secondary" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Selected
            </Button>
          )}
          <Button variant="ghost">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Total Countries</CardTitle>
            <CardDescription className="text-gray-500">With active users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">15</div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>3 new countries this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Global Users</CardTitle>
            <CardDescription className="text-gray-500">Total users worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">5,200</div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Global Revenue</CardTitle>
            <CardDescription className="text-gray-500">Total revenue from all countries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">$101,000</div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Country Distribution</CardTitle>
          <CardDescription>Users and revenue by country</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <div className="flex items-center">
                    <Switch
                      checked={selectedCountries.length === filteredCountries.length && filteredCountries.length > 0}
                      onCheckedChange={handleToggleAllSelection}
                      className="mr-2"
                    />
                  </div>
                </TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Revenue</TableHead>
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
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-20 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-10 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                  </TableRow>
                ))
              ) : filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                  <TableRow key={country.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={selectedCountries.includes(country.id)}
                          onCheckedChange={() => handleToggleCountrySelection(country.id)}
                          className="mr-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{country.name}</TableCell>
                    <TableCell>{country.users.toLocaleString()}</TableCell>
                    <TableCell>{formatCurrency(country.revenue)}</TableCell>
                    <TableCell>{country.courses}</TableCell>
                    <TableCell>{getStatusBadge(country.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No countries found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {!isLoading && filteredCountries.length > 0 && (
          <CardFooter className="flex justify-between items-center border-t border-gray-800 px-6 py-4">
            <div className="text-sm text-gray-500">
              Showing {filteredCountries.length} of {countries.length} countries
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

export default AdminCountriesPage;