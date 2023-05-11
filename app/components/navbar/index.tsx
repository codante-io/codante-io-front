import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Form, Link, useMatches } from "@remix-run/react";
import ToggleColorMode from "~/components/toggle-color-mode";
import { useColorMode } from "~/contexts/color-mode-context";
import { BsArrowRight } from "react-icons/bs";
import switchSound from "./switch.mp3";
import useSound from "use-sound";
import { AnimatePresence, motion } from "framer-motion";
import type { User } from "~/models/user.server";
import { setActiveClassForPath } from "~/utils/path-utils";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }: { user: any }) {
  const matches = useMatches();
  const [playSound] = useSound(switchSound, { volume: 0.25 });

  const { id } = matches[matches.length - 1];

  const { colorMode } = useColorMode();

  const navigation = [
    {
      name: "Workshops",
      href: "/workshops",
      current: id.includes("workshops"),
    },
    {
      name: "Mini Projetos",
      href: "/mini-projetos",
      current: id.includes("mini-projetos"),
    },
    {
      name: "Trilhas",
      href: "/trilhas",
      current: id.includes("trilhas"),
    },
    // { name: "Agenda", href: "/agenda", current: id.includes("agenda") },
  ];

  return (
    <Disclosure
      as="nav"
      className="text-gray-900 bg-transparent data-[headlessui-state=open]:bg-white dark:data-[headlessui-state=open]:bg-gray-darkest lg:bg-transparent"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 text-gray-900 rounded-md dark:text-slate-50 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => playSound()}
                >
                  <span className="sr-only">Open main menu</span>
                  <ToggleButton open={open} />
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link to="/">
                    {colorMode === "light" ? (
                      <img
                        className="hidden w-auto h-16 lg:block"
                        src="/cdnt-light.svg"
                        alt="Codante"
                      />
                    ) : (
                      <img
                        className="hidden w-auto h-16 lg:block"
                        src="/cdnt.svg"
                        alt="Codante"
                      />
                    )}
                  </Link>
                  <Link to="/">
                    {colorMode === "light" ? (
                      <img
                        className="block w-auto h-16 lg:hidden"
                        src="/cdnt-light.svg"
                        alt="Codante"
                      />
                    ) : (
                      <img
                        className="block w-auto h-16 lg:hidden"
                        src="/cdnt.svg"
                        alt="Codante"
                      />
                    )}
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:pt-4 sm:block">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    {navigation.map((item) => (
                      <Link
                        prefetch="intent"
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 underline dark:text-white  text-gray-700"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      to="/agenda"
                      className={`px-3 py-1.5 font-medium text-gray-700 rounded-md cursor-pointer dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 ${setActiveClassForPath(
                        matches,
                        "/agenda",
                        "bg-gray-200 dark:bg-gray-700"
                      )}`}
                    >
                      <CalendarDaysIcon className="w-6 h-6 " />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="hidden mr-3 sm:block">
                <ToggleColorMode />
              </div>

              {user ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                  {/* Profile dropdown */}
                  <ProfileMenu user={user} />
                </div>
              ) : (
                <Link
                  className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700 dark:text-white gap-x-1 sm:static sm:inset-auto sm:pr-0"
                  to="/login"
                >
                  Login <BsArrowRight className="hidden md:inline" />
                </Link>
              )}
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden"> */}
          <AnimatePresence>
            <motion.div
              layout
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, height: 0 }}
              exit={{ height: 0, transition: { duration: 0.2 } }}
              key="mobile-menu"
              className="px-2 space-y-1 overflow-hidden bg-white border-b-2 dark:border-slate-600 dark:bg-gray-darkest"
            >
              <div className="py-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "dark:bg-gray-dark dark:text-white bg-white text-gray-700 underline"
                        : "text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 hover:text-gray-900",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as="a"
                  href="/agenda"
                  className={`block px-3 py-2 text-base font-medium text-gray-700 rounded-md dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 hover:text-gray-900 ${setActiveClassForPath(
                    matches,
                    "/agenda",
                    "dark:bg-gray-dark dark:text-white bg-white text-gray-700 underline"
                  )} `}
                >
                  Agenda
                </Disclosure.Button>
                <div className="px-3 py-2">
                  <ToggleColorMode />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
}
function ToggleButton({ open }: { open: boolean }) {
  return (
    <svg width="23" height="23" viewBox="-1.5 -1.5 23 23" className="">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        animate={open ? "open" : "closed"}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        animate={open ? "open" : "closed"}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        animate={open ? "open" : "closed"}
      />
    </svg>
  );
}

function Path(props: any) {
  return (
    <motion.path
      initial={false}
      fill="transparent"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );
}

function ProfileMenu({ user }: { user: User }) {
  return (
    <Menu as="div" className="relative">
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
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-dark ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  active ? "dark:bg-gray-800/50 bg-gray-50" : "",
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
                    active ? "dark:bg-gray-800/50 bg-gray-50" : "",
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
