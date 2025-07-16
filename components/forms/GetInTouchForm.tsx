'use client';

import { useState } from 'react';

const GetInTouchForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add your form submission logic here (e.g., API call)
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <h4>GET IN TOUCH</h4>
      <input
        type='email'
        className='bg-[#C2C3C526] py-2 px-3 w-full'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type='submit'
        className='bg-accent px-6 py-2 text-black w-full md:w-auto hover:bg-accent-hover transition-colors duration-300 cursor-pointer'
        disabled={submitted}
      >
        {submitted ? 'SUBMITTED' : 'BRIEF'}
      </button>
    </form>
  );
};

export default GetInTouchForm;
