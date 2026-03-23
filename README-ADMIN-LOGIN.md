# Admin Registration and Login System

## Overview

This system provides secure admin registration and login functionality for the Talanta admin dashboard. It includes:

- **Admin Login Page** (`/admin/login`) - Secure login interface with admin-specific design
- **Admin Registration Page** (`/admin/register`) - Account creation with validation and security checks
- **API Endpoint** (`/api/admin/register`) - Backend registration handler using Supabase
- **Middleware** - Route protection and authentication

## Features

### Admin Login Page

- Cyberpunk-inspired design matching existing login page
- Admin-specific validation and error handling
- Secure password entry with masking
- Loading states for authentication
- Links to registration and user login
- Real-time error feedback with toast notifications

### Admin Registration Page

- Email validation (must end with @admin.talanta.com)
- Password strength validation (minimum 8 characters)
- Password confirmation check
- Security requirements display
- Success and error toast notifications
- Loading state during registration process
- Links to login and user login pages

### API Endpoint

- Secure backend endpoint at `/api/admin/register`
- Uses Supabase service role key for admin operations
- Input validation and sanitization
- Email format checking
- Password strength validation
- User existence check before registration
- Auto-confirm user creation
- Profile creation in profiles table
- CORS protection
- Error handling and logging

### Security Features

- **Email Validation**: Only @admin.talanta.com emails allowed
- **Password Strength**: Minimum 8 characters required
- **Input Sanitization**: All inputs validated and sanitized
- **CORS Protection**: Restricted to specific origins
- **Rate Limiting**: Prevent brute force attacks
- **Secure Storage**: Using Supabase's built-in authentication
- **Role Management**: Admin users get special privileges

## Usage

### Accessing Admin Pages

**Admin Login**:

```
http://localhost:3000/admin/login
```

**Admin Registration**:

```
http://localhost:3000/admin/register
```

### Registration Process

1. **Email**: Must be in format `admin@admin.talanta.com`
2. **Password**: Minimum 8 characters, should include letters and numbers
3. **Confirmation**: Password must be confirmed twice
4. **Security Check**: System will verify all inputs before creating account

### Login Process

1. **Email**: Enter your admin email (@admin.talanta.com)
2. **Password**: Enter your admin password
3. **Authentication**: System will validate credentials against Supabase
4. **Access**: Successful login redirects to `/admin` dashboard

## Database Structure

### Profiles Table

When an admin user is created, a profile is automatically created with:

```sql
-- Profiles table structure
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Authentication

Uses Supabase's built-in authentication system with:

- Email/password authentication
- User metadata with role information
- Session management
- JWT-based authentication

## Code Structure

### Frontend Files

1. **`src/app/admin/login/page.tsx`** - Admin login page component
2. **`src/app/admin/register/page.tsx`** - Admin registration page component
3. **`src/app/admin/middleware.ts`** - Admin route protection middleware

### Backend Files

1. **`src/app/api/admin/register/route.ts`** - Admin registration API endpoint

### Dependencies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Supabase** - Authentication and database

## Configuration

### Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### CORS Configuration

The API endpoint restricts requests to specific origins:

- `http://localhost:3000` (local development)
- `https://localhost:3000` (local HTTPS)
- `https://talanta-web.vercel.app` (production)
- `https://www.talanta-web.com` (production)

## Customization

### Email Domain Validation

To change the allowed admin email domain, modify the validation in:

- **API**: `src/app/api/admin/register/route.ts` (line 38)
- **Frontend**: `src/app/admin/register/page.tsx` (line 44)

### Password Requirements

To adjust password strength requirements, modify:

- **API**: `src/app/api/admin/register/route.ts` (line 44)
- **Frontend**: `src/app/admin/register/page.tsx` (line 48)

### Design Customization

Modify styles in:

- `src/app/admin/login/page.tsx` (login page)
- `src/app/admin/register/page.tsx` (registration page)

## Troubleshooting

### Common Issues

1. **Registration Failed**: Check console for error messages in browser or terminal
2. **Login Issues**: Verify credentials and check browser console
3. **CORS Errors**: Ensure your domain is listed in allowed origins
4. **Environment Variables**: Verify all variables are correctly set

### Logging

- Client-side errors are logged to browser console
- Server-side errors are logged to terminal
- API errors include detailed messages for debugging

## Security Best Practices

1. **HTTPS Only**: Always use HTTPS in production
2. **Environment Variables**: Keep secrets secure and not version controlled
3. **Rate Limiting**: Implement rate limiting on API endpoints
4. **Password Policies**: Enforce strong password requirements
5. **Security Audits**: Regularly audit authentication and authorization
6. **Multi-Factor Authentication**: Consider adding MFA for admin accounts

## Future Improvements

- Add CAPTCHA for registration
- Implement password reset functionality
- Add multi-factor authentication (MFA)
- Implement account lockout for failed login attempts
- Add logging and auditing
- Implement password strength meter
- Add email verification for registration
