import { Bars3Icon } from '@heroicons/react/16/solid';
import SideBar from './side-bar';

function MobileNavbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:hidden">
      <SideBar
        triggerIcon={<Bars3Icon className="w-4" />}
        triggerClassName="absolute top-2 left-2"
      >
        {children}
      </SideBar>
    </div>
  );
}

export default MobileNavbar;
