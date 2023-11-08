import { Menu, Transition } from "@headlessui/react";
import { FolderArrowDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { Fragment } from "react";
import { FiDownload, FiFigma, FiGithub, FiGlobe } from "react-icons/fi";
import classNames from "~/utils/class-names";

export default function WorkshopResourcesMenuButton({
  resources,
}: {
  resources: { type: string; url: string; name: string }[];
}) {
  function Icon({ resource }: { resource: any }) {
    const classnames =
      "inline-block w-4 h-4 mr-2 transition-colors text-brand-500 dark:text-brand-300 group-hover:text-brand-500 dark:group-hover:text-brand-300";
    if (resource.type === "figma") {
      return <FiFigma className={classnames} />;
    }

    if (resource.type === "file") {
      return <FiDownload className={classnames} />;
    }

    if (resource.type === "github") {
      return <FiGithub className={classnames} />;
    }

    if (resource.type === "url") {
      return <FiGlobe className={classnames} />;
    }

    return null;
  }

  return (
    <Menu as="div" className="relative z-50 hidden md:block">
      <div>
        <Menu.Button className="flex items-center gap-2 p-3 text-sm transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-background-700 dark:text-gray-500 hover:text-brand dark:hover:text-brand">
          <span className="sr-only">Abrir Menu de Materiais Extras</span>
          <FolderArrowDownIcon width={20} height={20} />
          Materiais Extras
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
        <Menu.Items className="absolute right-0 z-10 w-64 py-1 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-background-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {resources.map((resource) => (
              <Menu.Item key={resource.url}>
                {({ active }) => (
                  <Link
                    to={resource.url}
                    target="_blank"
                    className={classNames(
                      active ? "dark:bg-background-600 bg-background-150" : "",
                      "inline-flex w-full items-center gap-2 px-4 py-2 text-sm   rounded-lg",
                    )}
                  >
                    <span className="basis-5">
                      <Icon resource={resource} />
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-50">
                      {resource.name}
                    </span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
