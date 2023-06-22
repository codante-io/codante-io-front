import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Form, Link, NavLink, useMatches } from "@remix-run/react";
import ToggleColorMode from "~/components/toggle-color-mode";
import { useColorMode } from "~/contexts/color-mode-context";
import { BsArrowRight } from "react-icons/bs";
import switchSound from "./switch.mp3";
import useSound from "use-sound";
import { AnimatePresence, motion } from "framer-motion";
import type { User } from "~/models/user.server";
import { setActiveClassForPath } from "~/utils/path-utils";
import ProfileMenu from "./profile-menu";

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
    },
    {
      name: "Mini Projetos",
      href: "/mini-projetos",
    },
    {
      name: "Trilhas",
      href: "/trilhas",
    },
    // { name: "Agenda", href: "/agenda", current: id.includes("agenda") },
  ];

  return (
    <Disclosure
      as="nav"
      className="text-gray-900 bg-transparent data-[headlessui-state=open]:bg-white dark:data-[headlessui-state=open]:bg-background-900 lg:bg-transparent"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 text-gray-900 rounded-md dark:text-gray-50 hover:bg-background-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                      <NavLink
                        prefetch="intent"
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-background-100/70 dark:bg-background-700 dark:hover:bg-background-700 underline dark:text-white  text-gray-700"
                              : "text-gray-700 dark:text-gray-300 hover:bg-background-100 dark:hover:bg-background-700 hover:text-gray-900",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/agenda"
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-background-100/70 dark:bg-background-700"
                            : "",
                          "px-3 py-1.5 font-medium text-gray-700 rounded-md cursor-pointer dark:text-gray-300 hover:bg-background-100 dark:hover:bg-background-700 hover:text-gray-900"
                        )
                      }
                    >
                      <CalendarDaysIcon className="w-6 h-6 " />
                    </NavLink>
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
              className="px-2 space-y-1 overflow-hidden bg-white border-b-2 dark:border-slate-600 dark:bg-background-900"
            >
              <div className="py-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "dark:bg-background-800 dark:text-white bg-white text-gray-700 underline"
                        : "text-gray-700 dark:text-gray-300 hover:bg-background-100 dark:hover:bg-background-700 hover:text-gray-900",
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
                  className={`block px-3 py-2 text-base font-medium text-gray-700 rounded-md dark:text-gray-300 hover:bg-background-100 dark:hover:bg-background-700 hover:text-gray-900 ${setActiveClassForPath(
                    matches,
                    "/agenda",
                    "dark:bg-background-800 dark:text-white bg-white text-gray-700 underline"
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
