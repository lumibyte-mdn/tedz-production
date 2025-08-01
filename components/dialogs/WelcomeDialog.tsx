'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import AppLogo from '../AppLogo';
import { Button } from '../ui/button';

const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit') !== 'false';
    if (isFirstVisit) {
      setOpen(true);
      localStorage.setItem('isFirstVisit', 'false');
    }
  }, []);

  useEffect(() => {
    const clearLocalStorageAfter24Hours = () => {
      const timestamp = localStorage.getItem('visitTimestamp');
      if (timestamp) {
        const elapsedTime = Date.now() - parseInt(timestamp, 10);
        const hour = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (elapsedTime > hour) {
          localStorage.removeItem('isFirstVisit');
          localStorage.removeItem('visitTimestamp');
        }
      }
    };

    const timestamp = localStorage.getItem('visitTimestamp');
    if (!timestamp) {
      localStorage.setItem('visitTimestamp', Date.now().toString());
    }

    clearLocalStorageAfter24Hours();
  }, []);

  function handleWhatsAppChat() {
    const phoneNumber = '6285117305638'; // Replace with your WhatsApp number
    const message = encodeURIComponent(
      'Hallo, Saya ingin bertanya tentang layanan Anda.'
    ); // Default message
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(url, '_blank');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader className='flex flex-col items-center text-center'>
          <AppLogo className='mb-4' />
          <DialogTitle className='text-xl font-bold'>
            Welcome to Tedz Production
          </DialogTitle>
          <DialogDescription className='mt-2 text-sm text-gray-600 text-center'>
            We are excited to have you here! Explore our services and feel free
            to reach out to us for any inquiries.
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4 flex justify-center'>
          <a href='https://api.whatsapp.com/send?phone=6285117305638'>
            <Button
              size={'lg'}
              className='bg-secondary hover:bg-secondary-hover text-secondary-foreground rounded-md font-semibold text-sm cursor-pointer'
              onClick={handleWhatsAppChat}
            >
              Chat WhatsApp
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default WelcomeDialog;
