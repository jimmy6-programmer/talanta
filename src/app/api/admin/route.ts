import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is admin (in a real app, you would check this in your database)
    const isAdmin = user.email?.endsWith('@admin.talanta.com');
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Get dashboard statistics
    const [
      usersData,
      coursesData,
      enrollmentsData,
      progressData
    ] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('courses').select('*'),
      supabase.from('enrollments').select('*'),
      supabase.from('progress').select('*')
    ]);
    
    // Calculate total users
    const totalUsers = usersData.data?.length || 0;
    
    // Calculate total courses
    const totalCourses = coursesData.data?.length || 0;
    
    // Calculate total enrollments
    const totalEnrollments = enrollmentsData.data?.length || 0;
    
    // Calculate completed lessons
    const completedLessons = progressData.data?.filter(p => p.is_completed).length || 0;
    
    // Get recent users
    const recentUsers = usersData.data?.slice(0, 5) || [];
    
    // Get course enrollment distribution
    const courseEnrollmentData = coursesData.data?.map(course => {
      const enrollmentCount = enrollmentsData.data?.filter(e => e.course_id === course.id).length || 0;
      return {
        name: course.title,
        value: enrollmentCount,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
      };
    }) || [];
    
    return NextResponse.json({
      stats: {
        totalUsers,
        totalCourses,
        totalEnrollments,
        completedLessons
      },
      recentUsers,
      courseEnrollmentData
    });
    
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
