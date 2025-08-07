import ChangePasswordForm from '@/components/forms/ChangePasswordForm';

const ChangePasswordSection = () => {
  return (
    <section className='section'>
      <header className='mb-4 border-b border-border pb-2'>
        <h2 className='text-base font-semibold mb-1'>Change Password</h2>
        <p className='text-xs md:text-sm text-muted-foreground'>
          Update your password for better security.
        </p>
      </header>

      <main>
        <ChangePasswordForm />
      </main>
    </section>
  );
};
export default ChangePasswordSection;
