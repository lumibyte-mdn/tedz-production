type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const PageTitle = ({ title, subtitle, children }: Props) => {
  return (
    <header className='flex-between gap-4 mb-6'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-2xl font-bold'>{title}</h3>
        {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
      </div>
      {children}
    </header>
  );
};
export default PageTitle;
