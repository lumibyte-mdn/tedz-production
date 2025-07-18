import { checkAdminAccountApi } from '@/api/auth';
import GenerateAdminForm from '@/components/forms/GenerateAdminForm';
import LoginForm from '@/components/forms/LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const LoginPage = async () => {
  const isAdminExists = await checkAdminAccountApi();

  return (
    <main className='flex-center flex-col min-h-lvh px-6'>
      {isAdminExists ? (
        <Card className='w-full max-w-sm shadow-none'>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      ) : (
        <Card className='w-full max-w-sm shadow-none'>
          <CardHeader>
            <CardTitle>Admin Account Not Found</CardTitle>
            <CardDescription>
              Please create an admin account first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenerateAdminForm />
          </CardContent>
        </Card>
      )}
    </main>
  );
};
export default LoginPage;
