import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Form, Link } from "@remix-run/react";
import { Fragment } from "react";
import type { User } from "~/models/user.server";
import classNames from "~/utils/class-names";

export default function ProfileMenu({ user }: { user: User }) {
  return (
    <Menu as="div" className="relative z-50">
      <div>
        <Menu.Button className="flex text-sm rounded-full text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
          <span className="sr-only">Open user menu</span>
          {user?.avatar_url ? (
            <img
              className="w-8 h-8 rounded-full"
              src={user?.avatar_url}
              alt=""
            />
          ) : (
            <UserCircleIcon className="w-6 h-6" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-background-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <>
              <div className="block px-4 py-2 text-xs font-light text-gray-500 dark:text-gray-300">
                Olá {user.name}
              </div>
              <hr className="dark:border-gray-800" />
            </>
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/conta"
                className={classNames(
                  active ? "dark:bg-background-800/50 bg-background-50" : "",
                  "block px-4 py-2 text-sm dark:text-gray-50 text-gray-700"
                )}
              >
                Minha Conta
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Form action="/logout" method="post">
                <button
                  className={classNames(
                    active ? "dark:bg-background-800/50 bg-background-50" : "",
                    "block px-4 py-2 text-sm dark:text-gray-50 text-gray-700 w-full text-left"
                  )}
                >
                  Sair
                </button>
              </Form>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
