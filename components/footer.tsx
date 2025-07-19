import Image from 'next/image';
import Link from 'next/link';

import tedz from '@/public/tedz.svg';
import GetInTouchForm from './forms/GetInTouchForm';
import Container from './wrappers/Container';
import AppLogo from './AppLogo';

const navList = [
  {
    title: 'COMPANY',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Tedz Project', href: '/about' },
      { label: 'Instagram', href: '/projects' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'SERVICES',
    links: [
      { label: 'Videography', href: '/terms' },
      { label: 'Photography', href: '/privacy' },
      { label: 'Social Media', href: '/cookies' },
      { label: 'Tiktok Live', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='text-white bg-soft-dark'>
      <Container className='grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto lg:py-32 px-4 py-14 md:px-8 lg:px-16 xl:px-20 !my-0'>
        {/* Left */}
        <div>
          <AppLogo className='max-w-[150px]' />
          <div className='my-6'>
            <p className='text-sm'>
               Jl. Komp. Multatuli Indah Blk. F No.8 <br />
              Sumatera Utara 20212 - Indonesia
            </p>
          </div>
        </div>

        {/* Middle */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {navList.map((section) => (
            <div key={section.title}>
              <h4 className='font-semibold'>{section.title}</h4>
              <ul className='text-sm text-gray-300'>
                {section.links.map((link) => (
                  <li className='my-3' key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right */}
        <GetInTouchForm />
      </Container>
    </footer>
  );
}
