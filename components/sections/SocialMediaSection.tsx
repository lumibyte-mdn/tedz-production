import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from '@tabler/icons-react';
import Section from './Section';

const mockSocialMediaLinks = [
  {
    platform: 'Tiktok',
    url: 'https://www.tiktok.com/@tedz.production?is_from_webapp=1&sender_device=pc',
    icon: <IconBrandTiktok size={24} className='text-white' />,
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/tedz.production?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    icon: <IconBrandInstagram size={24} className='text-white' />,
  },
  {
    platform: 'Whatsapp',
    url: 'https://api.whatsapp.com/send?phone=6285117305638',
    icon: <IconBrandWhatsapp size={24} className='text-white' />,
  },
];

const SocialMediaSection = () => {
  return (
    <Section>
      <h2 className='text-2xl font-bold mb-6'>Follow Us</h2>
      <div className='flex space-x-4'>
        {mockSocialMediaLinks.map((link) => (
          <a key={link.platform} href={link.url} className='flex items-center'>
            {link.icon}
            <span className='ml-2 text-lg font-medium hover:underline'>
              {link.platform}
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
};
export default SocialMediaSection;
