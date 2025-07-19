import Section from './Section';

const EmbededMapSection = () => {
  return (
    <Section>
      <div className='flex-center'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0506825500834!2d98.68020949999999!3d3.5758232000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131ffe22de271%3A0x1648615aaa03a7a8!2sCetak%20Dong%20Printing%20Medan!5e0!3m2!1sid!2sid!4v1752891922443!5m2!1sid!2sid'
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
