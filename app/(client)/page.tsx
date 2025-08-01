import WhatsappButton from '@/components/buttons/WhatsappButton';
import WelcomeDialog from '@/components/dialogs/WelcomeDialog';
import AboutSection from '@/components/sections/AboutSection';
import ClientPartnersSection from '@/components/sections/ClientPartnersSection';
import HeroSection from '@/components/sections/HeroSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ServiceSection from '@/components/sections/ServiceSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';

export default function Home() {
  return (
    <>
      <WelcomeDialog />
      <HeroSection />
      <ProjectSection />
      <ClientPartnersSection />
      <ServiceSection />
      <ShowcaseSection />
      <AboutSection />
      {/* <ContactSection /> */}
      <WhatsappButton
        phoneNumber='6285117305638'
        accountName={'Tedz Productions'}
        avatar='/images/avatar.jpg'
        allowEsc
        className='floating-whatsapp'
        statusMessage='Online'
        chatMessage='Thank you for contacting Tedz Production! Please let us know how we can help you.'
      />
    </>
  );
}
