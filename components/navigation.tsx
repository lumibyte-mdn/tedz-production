'use client';

import tedz from '@/public/tedz.svg';

import Image from 'next/image';
import Link from 'next/link';
import AppLogo from './AppLogo';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'TEDZ PROJECT', href: '/projects' },
  { name: 'INSTAGRAM', href: '#' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Navigation() {
  function handleWhatsAppChat() {
    const phoneNumber = '628123456789'; // Replace with your WhatsApp number
    const message = encodeURIComponent('Hello, I would like to chat!');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  return (
    <>
      <div className='bg-[#040b11] fixed top-0 z-50 w-full'>
        <header className='max-w-7xl py-4 mx-auto'>
          <div className='grid grid-cols-4'>
            <AppLogo />
            <div className='flex gap-12 col-span-2 items-center justify-center'>
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className={
                    'text-sm hover:text-secondary text-white font-semibold'
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className='flex justify-end items-center'>
              <button
                className='bg-secondary hover:bg-secondary-hover text-secondary-foreground py-2 px-4 rounded-md font-semibold text-sm cursor-pointer'
                onClick={handleWhatsAppChat}
              >
                Chat WhatsApp
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
