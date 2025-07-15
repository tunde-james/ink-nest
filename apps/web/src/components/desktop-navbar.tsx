'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type Props = PropsWithChildren;

function DesktopNavbar(props: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const pathname = usePathname();

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener('scroll', handleScroll, { signal });

    return () => {
      // window.removeEventListener('scroll', handleScroll);
      controller.abort();
    };
  });

  const isScrollDown = scrollPosition > 10;
  const isHome = pathname === '/';

  return (
    <nav
      className={cn(
        'hidden fixed transition-colors w-full z-50 text-white md:block',
        {
          'bg-white text-gray-700 shadow-md': isScrollDown || !isHome,
        }
      )}
    >
      <div className="flex items-center p-4 container">{props.children}</div>

      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
}

export default DesktopNavbar;
