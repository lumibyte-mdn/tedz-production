import ContactForm from '../forms/ContactForm';

const ContactSection = () => {
  return (
    <section className='max-w-7xl mx-auto flex items-center py-10'>
      <div>
        <span className='uppercase font-bold text-7xl text-white'>
          Send <br /> your <br /> brief
        </span>
      </div>
      <ContactForm />
    </section>
  );
};
export default ContactSection;
