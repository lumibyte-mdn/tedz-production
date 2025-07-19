'use client';

import Link from 'next/link';
import AppLogo from './AppLogo';
import Container from './wrappers/Container';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { IconMenuDeep } from '@tabler/icons-react';

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
      <div className='fixed top-0 z-50 w-full bg-base-dark'>
        <Container className='py-4'>
          <div className='flex-between'>
            <AppLogo />
            <div className='gap-12 col-span-2 items-center justify-center hidden md:flex'>
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
            <div className='hidden md:flex justify-end items-center'>
              <button
                className='bg-secondary hover:bg-secondary-hover text-secondary-foreground py-2 px-4 rounded-md font-semibold text-sm cursor-pointer'
                onClick={handleWhatsAppChat}
              >
                Chat WhatsApp
              </button>
            </div>

            <div className='md:hidden flex items-center'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size='icon' variant={'secondary'}>
                    <IconMenuDeep className='size-6' />
                  </Button>
                </SheetTrigger>
                <SheetContent className='bg-base-dark border-0 text-white'>
                  <SheetHeader>
                    <SheetTitle>
                      <AppLogo />
                    </SheetTitle>
                  </SheetHeader>

                  <main className='flex flex-col gap-4 mt-4'>
                    {navigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                        className='block text-sm py-2 px-8 hover:text-secondary text-white font-semibold'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </main>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
