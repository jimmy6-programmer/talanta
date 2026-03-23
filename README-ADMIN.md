# Talanta Admin Dashboard

A powerful cybernetic admin dashboard for managing the Talanta platform with comprehensive analytics features.

## Features

### 1. Dashboard Overview

- Real-time statistics display
- Total users, revenue, courses, and completions
- Monthly performance charts
- Course enrollment distribution
- System health monitoring
- Global user locations visualization

### 2. Analytics Section

- **Charts and Graphs**: Interactive charts showing monthly performance, course distributions, and API response times
- **User Analytics**: Detailed breakdown of user activity, locations, and behaviors
- **Revenue Analysis**: Tracking of financial performance and transaction history
- **Course Performance**: Analytics on course completions, enrollment trends, and student progress

### 3. User Management

- User profile management
- Activity tracking
- Status monitoring
- Search and filter functionality

### 4. Course Management

- Course listings and statistics
- Enrollment tracking
- Content management
- Performance analytics

### 5. System Monitoring

- Server health status
- API performance monitoring
- Active user sessions
- System resources utilization

### 6. Global Visualization

- Interactive 3D globe showing user locations
- Clickable points with detailed information
- Color-coded regions for easy identification

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **Recharts** - Data visualization
- **react-globe.gl** - 3D globe visualization
- **Three.js** - 3D graphics
- **Supabase** - Backend and authentication

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd talanta-web
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Run the development server:

```bash
npm run dev
```

5. Access the dashboard:

```
http://localhost:3000/admin
```

## Usage

### Admin Authentication

To access the admin dashboard, users must have an admin account with an email ending in `@admin.talanta.com`.

### Dashboard Navigation

- **Sidebar Menu**: Provides quick access to different sections
- **Header**: Contains search, refresh, and theme toggle
- **Stats Overview**: Displays key metrics in cards
- **Analytics Charts**: Interactive charts with zoom and hover functionality
- **Tabs**: Switch between detailed views for users, transactions, and countries
- **System Status**: Real-time system performance monitoring

### API Endpoints

- `/api/admin` - Fetch dashboard statistics and data
- `/api/admin/users` - Manage user data
- `/api/admin/courses` - Manage course data
- `/api/admin/transactions` - View transaction history

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx - Main admin dashboard page
│   │   ├── AdminDashboardClient.tsx - Client-side dashboard component
│   │   └── middleware.ts - Admin authentication middleware
│   └── api/
│       └── admin/
│           └── route.ts - API endpoint for dashboard data
├── components/
│   ├── ui/ - shadcn/ui components
│   └── Globe.tsx - 3D globe visualization
└── utils/
    └── supabase/ - Supabase utilities
```

## Customization

### Adding New Metrics

1. Add the new metric to the API endpoint in `src/app/api/admin/route.ts`
2. Update the client component in `src/app/admin/AdminDashboardClient.tsx`
3. Add a new card to the stats overview section

### Customizing the Globe

1. Modify the Globe component in `src/components/Globe.tsx`
2. Adjust the points data to match your user locations
3. Customize colors, sizes, and effects

### Theme Customization

The dashboard supports dark and light themes. Modify the theme colors in `tailwind.config.ts`.

## Performance Optimization

- Charts are lazy-loaded for better initial load times
- Data fetching is optimized for minimal requests
- The globe uses WebGL for efficient rendering
- Images and assets are properly optimized

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and inquiries, please contact the development team or raise an issue in the repository.
