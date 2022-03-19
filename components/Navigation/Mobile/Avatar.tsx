import Image from "next/image";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";

const Avatar = () => {
  const { data: session, status } = useSession();

  if (!session?.user?.name) return <>Loading...</>;
  return (
    <div
      className="fixed top-2 right-2 z-50"
    >
      <Menu as={Fragment}>
        <div>
          <Menu.Button>
            <Image
              src={String(session.user.image)}
              className="rounded-full cursor-pointer"
              width="50"
              height="50"
              alt="avatar"
            />
          </Menu.Button>
          <Menu.Items className="fixed left-3 right-3 bg-gray-100 rounded-md text-black py-4 px-6 flex flex-col text-md font-medium space-y-3">
            <Menu.Item>
              <span className="text-lg border-b-2 border-red-500 max-w-fit">
                Hello, {session.user.name.split(" ")[0]}!
              </span>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`${active && "font-bold"}`}>Settings</a>
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
              <span onClick={() => signOut()}>Logout</span>
            </Menu.Item>
          </Menu.Items>
        </div>
      </Menu>
    </div>
  );
};
export default Avatar;
