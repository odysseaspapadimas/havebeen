import MobileNavbar from "./Mobile/MobileNavbar";
import NavItem from "./NavItem";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import Avatar from "./Mobile/Avatar";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  if (!session?.user?.name) return <>Loading...</>;
  const handleMenu = () => {};

  return (
    <>
      <div className="sm:hidden sm:border-r sm:border-gray-600">
        <Avatar />
        <MobileNavbar />
      </div>
      <div className="hidden sticky top-0 border-r border-gray-600 sm:flex flex-col justify-between flex-1 pt-20 h-screen">
        <div className="space-y-20 relative w-full text-xl">
          <NavItem href="/places" />
          <NavItem href="/add" />
          <NavItem href="/map" />
        </div>

        <Menu>
          <div className="mb-16 self-center justify-self-end relative z-50">
            <Menu.Button>
              <div
                className="z-50 text-lg border-0 p-4 rounded-md cursor-pointer flex flex-col justify-center items-center space-y-2 md:border-2 md:px-3 border-white "
                onClick={handleMenu}
              >
                {session?.user && (
                  <>
                    <Image
                      src={String(session.user.image)}
                      width="75"
                      height="75"
                      alt="avatar"
                      className="rounded-full"
                    />
                    <span>{session.user.name}</span>
                  </>
                )}
              </div>
            </Menu.Button>
            <Menu.Items style={{zIndex: 999}} className="z-50 absolute left-36 md:left-44 lg:left-52 xl:left-60 2xl:left-64 -top-10 bg-gray-100 border border-[#0b0e11] rounded-md text-black py-4 px-6 flex flex-col text-lg font-medium space-y-3">
              <Menu.Item>
                <span className="text-xl border-b-2 border-red-500 whitespace-nowrap ">
                  Hello, {session.user.name.split(" ")[0]}!
                </span>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="/a" className={`${active && "font-bold"}`}>
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active && "font-bold"}`}
                    href="/account-settings"
                  >
                    Documentation
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <span
                    className={`cursor-pointer ${active && "font-bold"}`}
                    onClick={() => signOut()}
                  >
                    Settings
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </div>
        </Menu>
      </div>
    </>
  );
};
export default Navbar;
