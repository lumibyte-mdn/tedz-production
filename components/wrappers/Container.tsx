import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <main className={cn('max-w-7xl mx-auto py-20 px-6', className)}>
      {children}
    </main>
  );
};
export default Container;
