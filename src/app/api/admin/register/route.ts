import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a direct connection to Supabase using the service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // For security, only allow this endpoint to be called from specific origins or with specific headers
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://talanta-web.vercel.app',
      'https://www.talanta-web.com'
    ];
    
    if (origin && !allowedOrigins.includes(origin)) {
      console.log('Forbidden origin:', origin);
      return NextResponse.json({ 
        success: false, 
        error: 'Forbidden' 
      }, { status: 403 });
    }

    const requestBody = await request.json();
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    const { email, password } = requestBody;

    // Validate input
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate admin email format (must end with @admin.talanta.com or @talanta.com)
    if (!email.endsWith('@admin.talanta.com') && !email.endsWith('@talanta.com')) {
      return NextResponse.json({
        success: false,
        error: 'Only @admin.talanta.com or @talanta.com emails are allowed for admin registration'
      }, { status: 403 });
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({
        success: false,
        error: 'Password must be at least 8 characters long'
      }, { status: 400 });
    }

    console.log('Attempting to create user with email:', email);
    
    // Check if user already exists using the correct method
    const checkResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users?email=${email}`,
      {
        method: 'GET',
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const checkData = await checkResponse.json();
    console.log('Check user exists response:', JSON.stringify(checkData, null, 2));
    console.log('Check data users length:', checkData.users ? checkData.users.length : 'undefined');
    console.log('Check data users emails:', checkData.users ? checkData.users.map((u: any) => u.email) : 'undefined');

    if (!checkResponse.ok) {
      console.error('Error checking existing user:', checkData);
      return NextResponse.json({
        success: false,
        error: 'Error checking existing user'
      }, { status: 500 });
    }

    const userExists = checkData.users && checkData.users.some((user: any) => user.email === email);
    if (userExists) {
      console.log('User already exists, returning 409');
      return NextResponse.json({
        success: false,
        error: 'User with this email already exists'
      }, { status: 409 });
    }

    // Create the admin user
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the user
      user_metadata: {
        role: 'admin',
        created_at: new Date().toISOString(),
        is_admin: true
      }
    });

    console.log('Create user response:', { userData, createError });

    if (createError) {
      console.error('Error creating admin user:', createError);
      return NextResponse.json({
        success: false,
        error: 'Error creating user'
      }, { status: 500 });
    }

    // Create user profile in the profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: userData.user.id,
        email: email,
        username: email.split('@')[0],
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }]);

    if (profileError) {
      console.error('Error creating user profile:', profileError);
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: userData.user.id,
        email: userData.user.email,
        role: 'admin'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
