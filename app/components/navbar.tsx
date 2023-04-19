import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Form, Link, useMatches } from "@remix-run/react";
import { BiUserCircle } from "react-icons/bi";
import ToggleColorMode from "~/components/toggle-color-mode";
import { useColorMode } from "~/contexts/color-mode-context";
import { BsArrowRight } from "react-icons/bs";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }: { user: any }) {
  const matches = useMatches();
  const { id } = matches[matches.length - 1];

  const { colorMode } = useColorMode();

  const navigation = [
    {
      name: "Trilhas",
      href: "/trilhas",
      current: id.includes("trilhas"),
    },
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
    { name: "Agenda", href: "/agenda", current: id.includes("agenda") },
  ];

  return (
    <Disclosure as="nav" className="bg-transparent text-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto container">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 dark:text-slate-50 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    {colorMode === "light" ? (
                      <img
                        className="hidden h-16 w-auto lg:block"
                        src="/cdnt-light.svg"
                        alt="Codante"
                      />
                    ) : (
                      <img
                        className="hidden h-16 w-auto lg:block"
                        src="/cdnt.svg"
                        alt="Codante"
                      />
                    )}
                  </Link>
                  <Link to="/">
                    {colorMode === "light" ? (
                      <img
                        className="block h-16 w-auto lg:hidden"
                        src="/cdnt-light.svg"
                        alt="Codante"
                      />
                    ) : (
                      <img
                        className="block h-16 w-auto lg:hidden"
                        src="/cdnt.svg"
                        alt="Codante"
                      />
                    )}
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:pt-4 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "dark:bg-gray-900 dark:text-white bg-white text-gray-900"
                            : "text-gray-900 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 hover:text-gray-900",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden sm:block mr-3">
                <ToggleColorMode />
              </div>
              {user ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                        <span className="sr-only">Open user menu</span>
                        {user?.avatar_url ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.avatar_url}
                            alt=""
                          />
                        ) : (
                          <BiUserCircle className="h-8 w-8 rounded-full" />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-white" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Dashboard
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-white" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Perfil
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-white" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Configurações
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Form action="/logout" method="post">
                              <button
                                className={classNames(
                                  active ? "bg-white" : "",
                                  "block px-4 py-2 text-sm text-gray-700 block w-full text-left"
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
                </div>
              ) : (
                <Link
                  className="dark:text-white text-gray-900 flex items-center gap-x-1"
                  to="/login"
                >
                  Login <BsArrowRight />
                </Link>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "dark:bg-gray-900 dark:text-white bg-white text-gray-900"
                      : "text-gray-900 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 hover:text-gray-900",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button className="text-gray-900 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 hover:text-gray-900block rounded-md px-3 py-2 text-base font-medium">
                <ToggleColorMode />
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
