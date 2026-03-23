import AdminDashboardClient from './AdminDashboardClient';

const AdminPage = async () => {
  // Since we're using temporary static authentication, we don't need to check Supabase
  // The middleware will handle authentication checks
  
  return <AdminDashboardClient />;
};

export default AdminPage;
