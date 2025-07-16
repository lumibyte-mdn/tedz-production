import Image from 'next/image';
import AboutImage from '@/public/images/about.png';

const AboutSection = () => {
  return (
    <section className='max-w-7xl mx-auto text-white flex justify-between items-center py-32'>
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
            brand kamu secara kuat, cepat, dan tepat sasaran. Kami percaya bahwa
            setiap brand punya cerita unik dan kami hadir untuk mengemas cerita
            itu menjadi konten visual yang menarik dan relevan untuk target
            audience kamu.
          </p>

          <p>
            Dengan pendekatan yang kreatif, strategis, dan berbasis data, kami
            membantu brand tampil lebih menonjol di tengah lautan konten
            digital. Mulai dari konsep hingga eksekusi, tim kami siap
            berkolaborasi untuk menciptakan video yang bukan hanya estetis, tapi
            juga efektif dalam menyampaikan pesan dan membangun koneksi
            emosional dengan audiensmu.
          </p>
        </div>
      </div>

      <Image
        src={AboutImage}
        alt='About Image'
        width={450}
        height={600}
        priority
        quality={100}
        className='md:w-[50%] h-[600px] w-[450px]'
      />
    </section>
  );
};
export default AboutSection;
