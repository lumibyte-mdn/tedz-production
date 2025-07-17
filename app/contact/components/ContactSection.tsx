import ContactForm from '@/components/forms/ContactForm';
import Section from '@/components/sections/Section';

const ContactSection = () => {
  return (
    <Section>
      <header className='mb-4'>
        <span className='uppercase font-bold lg:text-4xl text-accent text-4xl leading-tight'>
          Send your brief
        </span>
      </header>
      <ContactForm />
    </Section>
  );
};
export default ContactSection;
