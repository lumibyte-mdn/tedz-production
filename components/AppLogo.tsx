import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import SiteLogo from '@/public/tedz.svg';

type Props = {
  white?: boolean;
  clickable?: boolean;
  singleLogo?: boolean;
  className?: string;
};

const AppLogo = ({
  singleLogo,
  white = false,
  clickable = true,
  className,
  ...props
}: Props) => {
  return (
    <>
      {clickable ? (
        <Link
          href={'/'}
          {...props}
          className={cn('flex-center max-w-[120px] w-full', className)}
        >
          <Image
            src={SiteLogo}
            alt='Logo Tedz Production'
            width={150}
            height={150}
            priority
            className='w-full h-full object-contain'
          />
        </Link>
      ) : (
        <div
          {...props}
          className={cn('flex-center max-w-[120px] w-full', className)}
        >
          <Image
            src={SiteLogo}
            alt='Logo Tedz Production'
            width={150}
            height={150}
            priority
            className='w-full h-full object-contain'
          />
        </div>
      )}
    </>
  );
};
export default AppLogo;
