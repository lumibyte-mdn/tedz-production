'use client';

import Link from 'next/link';

const GetInTouchForm = () => {
  return (
    <>
      <div>
        <h4>GET IN TOUCH</h4>
        <Link
          href={"https://api.whatsapp.com/send?phone=6285117305638"}
          className='text-2xl font-bold'>+62 851-1730-5638</Link>
        <a href="https://api.whatsapp.com/send?phone=6285117305638">
          <button
            className='bg-secondary px-6 py-2 text-white rounded-md font-semibold w-full md:w-auto hover:bg-accent-hover transition-colors duration-300 cursor-pointer mt-4'
          >
            Chat WhatsApp
          </button>
        </a>
      </div>
    </>
  );
};

export default GetInTouchForm;
