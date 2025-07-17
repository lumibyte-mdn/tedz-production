import Section from './Section';

const EmbededMapSection = () => {
  return (
    <Section>
      <div className='flex-center'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6144.176633330742!2d98.6680264635586!3d3.5847675881097003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131ce67027443%3A0xb3196f95b6d5cdd4!2sLippo%20Plaza%20Medan!5e0!3m2!1sid!2sid!4v1752763615926!5m2!1sid!2sid'
          width='100%'
          height='450'
          style={{ border: 0 }}
          allowFullScreen={false}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </Section>
  );
};
export default EmbededMapSection;
