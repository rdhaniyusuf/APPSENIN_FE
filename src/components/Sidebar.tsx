'use client';

import { useState, FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { menuItems } from '@/utils/Helpers';
import { Tooltip } from '@heroui/react';

interface SidebarProps {
  onMenuClick?: (path: string) => void;
}

const SidebarComp: FC<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${isOpen ? 'w-64' : 'w-16 sm:items-center'
          } border border-r-red-100  h-full transition-all duration-300 sm:flex-col min-h-screen hidden sm:flex`}
      >
        <button
          className="p-4 focus:outline-none"
          onClick={handleMenuToggle}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className="mt-4 flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <NavItem
              key={`${item}-${index}`}
              href={item.href}
              icon={<item.icon />}
              text={item.name}
              isOpen={isOpen}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>
      </div>
    </>
  );
};

export default SidebarComp;

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
  isActive: boolean;
}

function NavItem({ href, icon, text, isOpen, isActive }: NavItemProps) {
  return (

    isOpen ? (
      <Link href={href} className={`flex items-center space-x-4 p-3 hover:bg-gray-300 rounded-md ${isActive ? "bg-slate-400 drop-shadow-sm text-cyan-900 rounded-md hover:cursor-default" : ""}`} >
        {icon}
        < span className="origin-left opacity-100 duration-500">{text}</span >
      </Link >
    ) : (
      <Tooltip key={null} showArrow content={text} placement={"right"} className='rounded-sm'>
        <Link href={href} className={`flex items-center space-x-4 p-3 hover:bg-gray-300 rounded-md ${isActive ? "bg-slate-400 drop-shadow-sm text-cyan-900 rounded-md hover:cursor-default" : ""}`}>
          {icon}
        </Link>
      </Tooltip>
    )
  );
}

