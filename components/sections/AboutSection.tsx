import Image from 'next/image';
import AboutImage from '@/public/images/about.png';

const AboutSection = () => {
  return (
    <section className='grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 py-16 '>
      {/* Left */}
      <div>
        <div className='text-accent mb-16'>
          <h3 className='text-2xl leading-relaxed'>
            WE ARE <br />
            <span className='text-5xl font-black uppercase'>
              Tedz <br /> production
            </span>
          </h3>
        </div>

        <div className='text-base text-gray-300'>
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

      <div className='flex items-center justify-end'>
        <Image
          src={AboutImage}
          alt='About Image'
          width={450}
          height={600}
          priority
          quality={100}
          className='h-[600px] w-[450px]'
        />
      </div>
    </section>
  );
};
export default AboutSection;
