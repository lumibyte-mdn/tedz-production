const ClientPartnersSection = () => {
  return (
    <section className="bg-[url('/images/clients.png')] bg-cover bg-center">
      <div className='bg-[#065DC6]/95 text-white py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 gap-10'>
          {/* Left */}
          <div>
            <div className='mb-10'>
              <h3 className='font-oswald text-xl lg:text-2xl font-medium mb-2'>
                CLIENTS AND PARTNERS
              </h3>
              <h1 className='font-oswald text-5xl lg:text-7xl font-black'>
                TEDZ <br /> PRODUCTION
              </h1>
            </div>

            <div className='text-sm'>
              <p className='mb-6'>
                Tedz Production adalah creative studio yang spesialis dalam
                pembuatan video pendek berdampak tinggi untuk menyampaikan pesan
                brand kamu secara kuat, cepat, dan tepat sasaran. Kami percaya
                bahwa setiap brand punya cerita unik dan kami hadir untuk
                mengemas cerita itu menjadi konten visual yang menarik dan
                relevan untuk target audience kamu.
              </p>

              <p>
                Dengan pendekatan yang kreatif, strategis, dan berbasis data,
                kami membantu brand tampil lebih menonjol di tengah lautan
                konten digital. Mulai dari konsep hingga eksekusi, tim kami siap
                berkolaborasi untuk menciptakan video yang bukan hanya estetis,
                tapi juga efektif dalam menyampaikan pesan dan membangun koneksi
                emosional dengan audiensmu.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className='flex flex-col justify-center items-center text-accent leading-none'>
            <h1 className='text-center font-oswald text-[150px] font-black tracking-tight'>
              100+
            </h1>
            <p className='font-oswald text-5xl font-black mt-2 text-center'>
              CLIENTS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ClientPartnersSection;
