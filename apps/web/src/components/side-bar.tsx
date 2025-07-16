'use client';

import { useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  triggerIcon: React.ReactNode;
  triggerClassName?: string;
}

function SideBar({ children, triggerIcon, triggerClassName }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => {
    setShowSidebar(false);
  });

  return (
    <>
      <button
        onClick={() => setShowSidebar((prev) => !prev)}
        className={triggerClassName}
      >
        {triggerIcon}
      </button>

      <div
        ref={ref}
        className={cn(
          'w-60 absolute top-0 z-50 duration-300 transition-all bg-white rounded-r-md min-h-screen',
          {
            '-left-full': !showSidebar,
            'left-0': showSidebar,
          }
        )}
      >
        {children}
      </div>
    </>
  );
}

export default SideBar;
