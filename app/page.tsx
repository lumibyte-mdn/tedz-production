'use client';

import Link from 'next/link';
import Image from 'next/image';

import allBrands from '@/public/images/brands.png';
import pizza from '@/public/images/pizza.png';
import about from '@/public/images/about.png';

import { FloatingWhatsApp } from 'react-floating-whatsapp';
import HeroSection from '@/components/sections/HeroSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ClientPartnersSection from '@/components/sections/ClientPartnersSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <ClientPartnersSection />

      <div className='max-w-7xl mx-auto py-32'>
        <h1 className='text-4xl text-accent text-center mb-20'>OUR SERVICES</h1>

        <div className='grid grid-cols-3'>
          <div className="bg-[url('/images/services.png')] bg-cover w-[375px] h-[400px]">
            <div className='bg-black/30 h-full flex flex-col items-center justify-end pb-5'>
              <Link href='' className='text-center text-white text-3xl'>
                <p className=''>VIDEO</p>
                <p className=''>COMMERCIALS</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase */}
      <div>
        <Image src={allBrands} alt='brands' />

        {/* Dynamic content based on latest */}
        <div className='grid grid-cols-2'>
          <Image src={pizza} alt='pizza' />
          <Image src={pizza} alt='pizza' />
        </div>
      </div>

      {/* About */}
      <div className='max-w-7xl mx-auto text-white flex justify-between items-center py-32'>
        {/* Left */}
        <div className='w-[50%]'>
          <div className='text-accent mb-16'>
            <h3 className='text-3xl'>WE ARE</h3>
            <h1 className='text-7xl'>TEDZ</h1>
            <h1 className='text-7xl'>PRODUCTION</h1>
          </div>

          <div>
            <p className='mb-8'>
              Tedz Production adalah creative studio yang spesialis dalam
              pembuatan video pendek berdampak tinggi untuk menyampaikan pesan
              brand kamu secara kuat, cepat, dan tepat sasaran. Kami percaya
              bahwa setiap brand punya cerita unik dan kami hadir untuk mengemas
              cerita itu menjadi konten visual yang menarik dan relevan untuk
              target audience kamu.
            </p>

            <p>
              Dengan pendekatan yang kreatif, strategis, dan berbasis data, kami
              membantu brand tampil lebih menonjol di tengah lautan konten
              digital. Mulai dari konsep hingga eksekusi, tim kami siap
              berkolaborasi untuk menciptakan video yang bukan hanya estetis,
              tapi juga efektif dalam menyampaikan pesan dan membangun koneksi
              emosional dengan audiensmu.
            </p>
          </div>
        </div>

        <Image
          src={about}
          alt='about'
          className='md:w-[50%] h-[600px] w-[450px]'
        />
      </div>

      {/* Contact */}
      <div className='max-w-7xl mx-auto flex items-center py-10'>
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
      </div>

      <FloatingWhatsApp
        phoneNumber='6285117305638'
        accountName={'Tedz Productions'}
        avatar='/images/avatar.jpg'
        allowEsc
        className='floating-whatsapp'
        statusMessage='Online'
        chatMessage='Thank you for contacting Tedz Production! Please let us know how we can help you.'
      />
    </>
  );
}
