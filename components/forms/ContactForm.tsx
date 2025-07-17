'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Remove non-digit characters and ensure starts with '08'
      let cleaned = value.replace(/\D/g, '');
      if (!cleaned.startsWith('08')) {
        cleaned = '08' + cleaned.replace(/^0+/, '');
      }
      setFormData({
        ...formData,
        [name]: cleaned,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form className='w-full space-y-3 lg:col-span-2' autoComplete='off'>
      <div className='flex mb-3 space-x-2'>
        <label className='sr-only' htmlFor='contact-name'>
          Name
        </label>
        <input
          id='contact-name'
          name='name'
          type='text'
          placeholder='Name'
          className='bg-white w-full px-4 py-2 text-gray-800'
          autoComplete='name'
          required
          value={formData.name}
          onChange={handleChange}
        />
        <label className='sr-only' htmlFor='contact-email'>
          Email
        </label>
        <input
          id='contact-email'
          name='email'
          type='email'
          placeholder='Email'
          className='bg-white w-full px-4 py-2 text-gray-800'
          autoComplete='email'
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='sr-only' htmlFor='contact-phone'>
          Phone Number
        </label>
        <input
          id='contact-phone'
          name='phone'
          type='tel'
          placeholder='Phone Number'
          className='bg-white w-full px-4 py-2 text-gray-800'
          autoComplete='tel'
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='sr-only' htmlFor='contact-message'>
          Message
        </label>
        <textarea
          id='contact-message'
          name='message'
          rows={5}
          className='bg-white w-full px-4 py-1 text-gray-800'
          placeholder='Message'
          required
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button
        type='submit'
        className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
      >
        Send
      </button>
    </form>
  );
};
export default ContactForm;
