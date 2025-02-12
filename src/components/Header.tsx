'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu, NavbarMenuItem,
  Tooltip,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image
} from "@heroui/react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { menuItems } from "@/utils/Helpers";
import { getUser, logoutUser } from "@/utils/Auth";

export const AppseninLogo = () => {
  return (
    <Image
      src="../appsenin_logo.svg" alt="AppseninLogo" width={'48px'} height={'auto'} />
  );
};

export default function HeaderComp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    logoutUser();
    router.push("/auth/login");
  }

  interface User {
    user_name: string;
    user_fullname: string;
    user_role: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="sticky top-0 z-50" classNames={{ base: "justify-between", wrapper: 'max-w-[100%]' }} >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AppseninLogo />
          <p className="font-bold text-inherit">Appsenin Ajah</p>
        </NavbarBrand>
      </NavbarContent>


      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`} defaultValue={item.href}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent as="div" justify="end">
        <Tooltip showArrow placement="bottom"
          content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">{user?.user_role}</div>
            </div>
          }
        >
          <div className="hidden xl:flex xl:flex-col xl:gap-1 xl:items-end xl:justify-center ">
            <h4 className="text-small font-semibold leading-none text-default-800">{user?.user_fullname}</h4>
          </div>
        </Tooltip>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={user?.user_name
                ?.split('.')
                .map(part => part.charAt(0))
                .join('') || ""}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" title="Profile Actions">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.user_name}</p>
            </DropdownItem>
            <DropdownItem key="team_settings" href="/user-settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
