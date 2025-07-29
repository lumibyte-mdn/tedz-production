import { getProjectDetailApi } from '@/api/projects';
import ContactSection from '@/components/sections/ContactSection';
import Image from 'next/image';

const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const param = await params;
  const id = parseInt(param.id);

  const data = await getProjectDetailApi(id);

  return (
    <>
      <main className='mt-18'>
        <section id='hero-section' className='relative w-full h-auto'>
          <Image
            src={
              data.image || 'https://placehold.co/400x400?text=Project+Image'
            }
            alt={data.title}
            width={800}
            height={400}
            priority
            objectFit='cover'
            className='w-full h-full object-cover'
          />
          <div className='absolute z-10 bottom-6 md:bottom-20 left-0 right-0 text-black text-center flex-center flex-col'>
            <h1 className='text-2xl md:text-4xl lg:text-6xl font-oswald font-bold md:mb-4 mb-2'>
              {data.title}
            </h1>
            <p className='text-lg md:text-xl font-oswald'>{data.description}</p>
          </div>
        </section>

        <section
          id='details-section'
          className={"bg-[url('/images/clients.png')] bg-cover bg-center"}
        >
          <div className='px-4 md:px-8 pt-6 pb-10 lg:pt-10 bg-secondary/95 text-white font-oswald lg:pb-20 '>
            <h2 className='text-2xl md:text-4xl font-bold mb-6 text-center '>
              Project Details
            </h2>
            <div className='text-base lg:text-xl text-center flex items-center justify-evenly'>
              <p className='mb-4'>Category: {data.category?.name || 'N/A'}</p>
              <p className='mb-4'>
                Posted At: {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className='mt-4 lg:mt-8'>
              <p className='text-base lg:text-xl text-center'>
                {data.description}
              </p>
            </div>
          </div>
        </section>

        <section id='gallery-section' className='grid grid-cols-3'>
          {data.projectImages?.length > 0 ? (
            data.projectImages.map((item, index) => (
              <Image
                key={index}
                src={item.image}
                alt={`Project Image ${index + 1}`}
                width={400}
                height={400}
                className='w-full h-auto object-cover'
              />
            ))
          ) : (
            <p className='text-center text-lg'>No images available</p>
          )}
        </section>

        <section
          id='video-section'
          className='mt-10 px-4 md:px-8 py-6 bg-base-dark text-white font-oswald container mx-auto pb-32'
        >
          <h2 className='text-2xl md:text-4xl font-bold mb-6 text-center'>
            Project Video
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16'>
            {data.projectVideos?.length > 0 ? (
              data.projectVideos.map((item, index) => (
                <video
                  key={index}
                  controls
                  className='w-full h-auto'
                  src={item.video}
                  // poster={item.thumbnail || 'https://placehold.co/400x400?text=Project+Video'}
                >
                  Your browser does not support the video tag.
                </video>
              ))
            ) : (
              <p className='text-center text-lg'>No video available</p>
            )}
          </div>
        </section>

        <ContactSection />
      </main>
    </>
  );
};

export default ProjectDetailPage;
