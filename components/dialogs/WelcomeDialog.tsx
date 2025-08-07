'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import AppLogo from '../AppLogo';
import { Button } from '../ui/button';

const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);

  const renderRef = useRef(0);

  useEffect(() => {
    if (renderRef.current > 0) return;
    setOpen(true);
    renderRef.current += 1;

    return () => {
      setOpen(false);
    };
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
            Mau liat-liat dulu atau langsung ngobrol aja nih?
          </DialogDescription>
        </DialogHeader>
        <div className='mt-4 flex justify-center gap-4'>
          <Button
            size={'lg'}
            variant={'outline'}
            className='hover:bg-secondary/10 hover:text-secondary text-secondary rounded-md font-semibold text-sm cursor-pointer'
            onClick={() => setOpen(false)}
          >
            Scroll aja dulu
          </Button>
          <a href='https://api.whatsapp.com/send?phone=6285117305638'>
            <Button
              size={'lg'}
              className='bg-secondary hover:bg-secondary-hover text-secondary-foreground rounded-md font-semibold text-sm cursor-pointer'
              onClick={handleWhatsAppChat}
            >
              <IconBrandWhatsapp />
              Langsung Chat
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default WelcomeDialog;
