'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Brand } from '@/prisma/generated/prisma';
import { getBrandListApi } from '@/api/brands';
import Marquee from 'react-fast-marquee';

const BrandListTape = () => {
  const { data: brands } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => await getBrandListApi(),
  });

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <div className='absolute z-20 bottom-0 w-full overflow-hidden bg-secondary py-4'>
      <Marquee autoFill speed={200}>
        {brands?.map((brand) => (
          <Image
            src={brand.logo || '/svg/padellogo.svg'}
            alt={`Brand Logo ${brand.name}`}
            key={brand.id}
            className='transition-all duration-300 grayscale hover:grayscale-0 mx-10'
            height={24}
            width={100}
          />
        ))}
      </Marquee>
    </div>
  );
};
export default BrandListTape;
