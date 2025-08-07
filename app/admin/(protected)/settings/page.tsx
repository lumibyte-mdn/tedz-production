import PageTitle from '@/components/PageTitle';
import ChangePasswordSection from '@/components/sections/admins/ChangePasswordSection';
import MyProfileSection from '@/components/sections/admins/MyProfileSection';

const SettingPage = () => {
  return (
    <main>
      <PageTitle
        title='Settings'
        subtitle='Manage your account settings here.'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <MyProfileSection />
        <ChangePasswordSection />
      </div>
    </main>
  );
};
export default SettingPage;
