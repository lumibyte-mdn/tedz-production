import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from '@tabler/icons-react';
import Section from './Section';

const mockSocialMediaLinks = [
  {
    platform: 'Instagram',
    url: 'https://instagram.com/yourprofile',
    icon: <IconBrandInstagram size={24} className='text-white' />,
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/yourprofile',
    icon: <IconBrandFacebook size={24} className='text-white' />,
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/yourprofile',
    icon: <IconBrandTwitter size={24} className='text-white' />,
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
