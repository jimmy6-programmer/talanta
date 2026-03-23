'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, Download, Plus, Eye, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock data for courses
const coursesData = [
  { id: 1, title: 'Full Stack Development', category: 'Development', level: 'Advanced', students: 342, completionRate: 85, status: 'Active' },
  { id: 2, title: 'Cybersecurity', category: 'Security', level: 'Intermediate', students: 278, completionRate: 78, status: 'Active' },
  { id: 3, title: 'Data Science', category: 'Data', level: 'Advanced', students: 298, completionRate: 82, status: 'Active' },
  { id: 4, title: 'Cloud Computing', category: 'Development', level: 'Intermediate', students: 234, completionRate: 75, status: 'Active' },
  { id: 5, title: 'Mobile Development', category: 'Development', level: 'Beginner', students: 189, completionRate: 70, status: 'Active' },
  { id: 6, title: 'UI/UX Design', category: 'Design', level: 'Beginner', students: 167, completionRate: 68, status: 'Active' },
  { id: 7, title: 'Machine Learning', category: 'Data', level: 'Advanced', students: 145, completionRate: 88, status: 'Draft' },
  { id: 8, title: 'DevOps', category: 'Development', level: 'Intermediate', students: 0, completionRate: 0, status: 'Inactive' },
  { id: 9, title: 'Digital Marketing', category: 'Marketing', level: 'Beginner', students: 213, completionRate: 65, status: 'Active' },
  { id: 10, title: 'Product Management', category: 'Business', level: 'Intermediate', students: 176, completionRate: 72, status: 'Active' }
];

const AdminCoursesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [courses, setCourses] = useState(coursesData);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleToggleCourseSelection = (courseId: number) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleToggleAllSelection = () => {
    if (selectedCourses.length === filteredCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(filteredCourses.map(course => course.id));
    }
  };

  const handleExport = () => {
    console.log('Exporting selected courses:', selectedCourses);
  };

  const handleAddCourse = () => {
    console.log('Adding new course');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Draft':
        return <Badge className="bg-yellow-500">Draft</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development':
        return 'blue';
      case 'Security':
        return 'red';
      case 'Data':
        return 'green';
      case 'Design':
        return 'purple';
      case 'Marketing':
        return 'orange';
      case 'Business':
        return 'cyan';
      default:
        return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Courses</h1>
        <p className="text-gray-500">Manage and monitor courses</p>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Data">Data</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedCourses.length > 0 && (
            <Button variant="secondary" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Selected
            </Button>
          )}
          <Button onClick={handleAddCourse}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
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
                      checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                      onCheckedChange={handleToggleAllSelection}
                      className="mr-2"
                    />
                  </div>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><div className="animate-pulse h-4 w-4 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-48 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-12 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-20 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-16 bg-gray-700 rounded"></div></TableCell>
                    <TableCell><div className="animate-pulse h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                  </TableRow>
                ))
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => handleToggleCourseSelection(course.id)}
                          className="mr-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>
                      <Badge className={`bg-${getCategoryColor(course.category)}-500`}>
                        {course.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={course.completionRate} className="w-20 mr-2" />
                        <span className="text-sm">{course.completionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No courses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {!isLoading && filteredCourses.length > 0 && (
          <CardFooter className="flex justify-between items-center border-t border-gray-800 px-6 py-4">
            <div className="text-sm text-gray-500">
              Showing {filteredCourses.length} of {courses.length} courses
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

export default AdminCoursesPage;