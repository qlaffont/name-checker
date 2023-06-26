import clsx from 'clsx';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-roboto' });

export const AppLayout = ({ children }: React.PropsWithChildren) => (
  <div
    className={clsx(
      roboto.className,
      'h-screen w-screen overflow-auto px-3 font-sans dark:bg-zinc-900 dark:text-white',
    )}
  >
    {children}
  </div>
);
