const ContactSection = () => {
  return (
    <section className='max-w-7xl mx-auto flex items-center py-10'>
      <div className='text-white text-7xl'>
        <h1>SEND</h1>
        <h1>YOUR</h1>
        <h1>BRIEF</h1>
      </div>

      <form className='w-full ml-32'>
        <div className='flex mb-3'>
          <input
            type='text'
            placeholder='Name'
            className='bg-white w-full mr-2 px-4 py-2'
          />
          <input
            type='text'
            placeholder='Email'
            className='bg-white w-full px-4 py-2'
          />
        </div>

        <div className='mb-3'>
          <input
            type='text'
            placeholder='Phone Number'
            className='bg-white w-full px-4 py-2'
          />
        </div>

        <div>
          <textarea
            rows={5}
            className='bg-white w-full px-4 py-1'
            placeholder='Message'
          ></textarea>
        </div>
      </form>
    </section>
  );
};
export default ContactSection;
