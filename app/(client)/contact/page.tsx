import Container from '@/components/wrappers/Container';
import ContactSection from './components/ContactSection';
import PageTitle from '@/components/titles/PageTitle';
import SocialMediaSection from '@/components/sections/SocialMediaSection';
import EmbededMapSection from '@/components/sections/EmbededMapSection';

const ContactPage = () => {
  return (
    <>
      <PageTitle title='Contact' wrapperClassName='mt-20' />
      <Container>
        <ContactSection />
        <SocialMediaSection />
        <EmbededMapSection />
      </Container>
    </>
  );
};
export default ContactPage;
