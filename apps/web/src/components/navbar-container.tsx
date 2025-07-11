import DesktopNavbar from './desktop-navbar';
import MobileNavbar from './mobile-navbar';

function NavbarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative'>
      <DesktopNavbar>{children}</DesktopNavbar>
      <MobileNavbar>{children}</MobileNavbar>
    </div>
  );
}

export default NavbarContainer;
