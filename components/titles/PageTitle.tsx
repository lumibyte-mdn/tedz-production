import { cn } from '@/lib/utils';

type Props = {
  title: string;
  subtitle?: string;
  wrapperClassName?: string;
};

const PageTitle = ({ title, subtitle, wrapperClassName }: Props) => {
  return (
    <header
      className={cn('flex-center py-10 bg-soft-dark my-8', wrapperClassName)}
    >
      <div className='text-center'>
        <h1 className='text-4xl font-bold  text-accent mb-2'>{title}</h1>
        {subtitle && <p className='text-lg  text-gray-500'>{subtitle}</p>}
      </div>
    </header>
  );
};
export default PageTitle;
