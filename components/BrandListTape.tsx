'use client';

import { getBrandList } from '@/api/brands';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const BrandListTape = () => {
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrandList,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  if (!brands) {
    return null;
  }

  return (
    <div className='absolute z-20 bottom-0 w-full overflow-hidden bg-secondary py-4'>
      <div className='animate-scroll flex justify-between gap-24'>
        {brands?.map((brand) => (
          <Image
            src={brand.logo || '/svg/padellogo.svg'}
            alt={`Brand Logo ${brand.name}`}
            key={brand.id}
            className='transition-all duration-300 grayscale hover:grayscale-0'
            height={24}
            width={100}
          />
        ))}
      </div>
    </div>
  );
};
export default BrandListTape;
