import Image from 'next/image';
import AllBrandImage from '@/public/images/brands.png';
import PizzaImage from '@/public/images/pizza.png';

const ShowcaseSection = () => {
  return (
    <section>
      <Image src={AllBrandImage} alt='brands' />

      {/* Dynamic content based on latest */}
      <div className='grid grid-cols-2'>
        <Image src={PizzaImage} alt='pizza' />
        <Image src={PizzaImage} alt='pizza' />
      </div>
    </section>
  );
};
export default ShowcaseSection;
