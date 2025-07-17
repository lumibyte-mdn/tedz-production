import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Section = ({ className, children }: Props) => {
  return (
    <section className={cn('py-10 text-white', className)}>{children}</section>
  );
};
export default Section;
