import ChangeProfileForm from '@/components/forms/ChangeProfileForm';

const MyProfileSection = () => {
  return (
    <section className='section lg:col-span-2'>
      <header className='mb-4 border-b border-border pb-2'>
        <h2 className='text-base font-semibold mb-1'>Profile Settings</h2>
        <p className='text-xs md:text-sm text-muted-foreground'>
          Update your profile information and preferences.
        </p>
      </header>

      <main>
        <ChangeProfileForm />
      </main>
    </section>
  );
};
export default MyProfileSection;
