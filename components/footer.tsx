import Image from 'next/image';
import Link from 'next/link';

import tedz from '@/public/tedz.svg';

export default function Footer() {
  return (
    <footer className='text-white bg-[#141B22]'>
      <div className='flex justify-around max-w-7xl mx-auto py-32'>
        {/* Left */}
        <div className='w-[40%]'>
          <Image src={tedz} alt='icon' />
          <div className='my-4'>
            <p>Jl Sunggal No 24524, Medan</p>
            <p>Sumatera Utara - Indonesia</p>
          </div>
        </div>

        {/* Right */}
        <div className='flex justify-between w-[60%]'>
          <div>
            <h4>COMPANY</h4>

            <ul>
              <li className='my-3'>
                <Link href=''>Home</Link>
              </li>
              <li className='my-3'>
                <Link href=''>About</Link>
              </li>
              <li className='my-3'>
                <Link href=''>Projects</Link>
              </li>
              <li className='my-3'>
                <Link href=''>Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>SUBSCRIBE</h4>

            <ul>
              <li className='my-3'>
                <Link href=''>Home</Link>
              </li>
              <li className='my-3'>
                <Link href=''>About</Link>
              </li>
              <li className='my-3'>
                <Link href=''>Projects</Link>
              </li>
              <li className='my-3'>
                <Link href=''>Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>GET IN TOUCH</h4>

            <input
              type='text'
              className='bg-[#C2C3C526] py-2 px-3 my-3'
              placeholder='Enter your email'
            />
            <button className='bg-accent px-6 py-2 text-black'>BRIEF</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
