import { getUser } from '@/lib/auth';

const DashboardPage = async () => {
  const user = await getUser();

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50'>
      <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center'>
        <h1 className='text-3xl font-extrabold mb-4 text-blue-600 font-sora'>
          Welcome to your dashboard, {user?.name ?? 'User'}!
        </h1>
        <p className='text-gray-700 font-sora'>
          Here you can manage your account, view analytics, and access all your
          admin tools.
        </p>
      </div>
    </div>
  );
};
export default DashboardPage;
