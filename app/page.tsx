import HeroSection from '@/components/sections/HeroSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ClientPartnersSection from '@/components/sections/ClientPartnersSection';
import ServiceSection from '@/components/sections/ServiceSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import WhatsappButton from '@/components/buttons/WhatsappButton';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <ClientPartnersSection />
      <ServiceSection />
      <ShowcaseSection />
      <AboutSection />
      <ContactSection />
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
