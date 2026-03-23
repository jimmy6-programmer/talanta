import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://talanta-web.vercel.app',
      'https://www.talanta-web.com'
    ];
    
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Forbidden' 
      }, { status: 403 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }

    if (!email.endsWith('@admin.talanta.com')) {
      return NextResponse.json({
        success: false,
        error: 'Only @admin.talanta.com emails are allowed'
      }, { status: 403 });
    }

    if (password.length < 8) {
      return NextResponse.json({
        success: false,
        error: 'Password must be at least 8 characters long'
      }, { status: 400 });
    }

    // Find the user by email
    const { data: existingUser, error: checkError } = await supabase.auth.admin.listUsers({
      email,
    });

    if (checkError) {
      console.error('Error checking existing user:', checkError);
      return NextResponse.json({
        success: false,
        error: 'Error checking existing user'
      }, { status: 500 });
    }

    if (existingUser.users.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.users[0].id,
      {
        password: password,
        email_confirm: true
      }
    );

    if (updateError) {
      console.error('Error updating password:', updateError);
      return NextResponse.json({
        success: false,
        error: 'Error updating password'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
