import ContactForm from '../forms/ContactForm';

const ContactSection = () => {
  return (
    <section className='max-w-7xl mx-auto py-10 grid grid-cols-1 mb-20 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16 xl:px-20'>
      <header>
        <span className='uppercase font-bold lg:text-7xl text-white text-4xl leading-tight'>
          Send <br className='hidden lg:inline-block' /> your{' '}
          <br className='hidden lg:inline-block' /> brief
        </span>
      </header>
      <ContactForm />
    </section>
  );
};
export default ContactSection;
