import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import MarkdownRenderer from "~/components/markdown-renderer";
import type { Instructor } from "~/models/instructor.server";

export default function InstructorCard({
  instructor,
}: {
  instructor: Instructor;
}) {
  const [opened, setOpened] = useState(false);
  const SocialIcons: { [key: string]: IconType } = {
    github: AiFillGithub,
    twitter: AiFillTwitterCircle,
    linkedin: AiFillLinkedin,
    website: MdComputer,
  };
  return (
    <div className="p-4 py-6 pr-4 mt-1 mb-4 transition rounded-lg hover:bg-background-200 dark:hover:bg-background-800">
      <div className="flex items-center">
        <img
          src={instructor?.avatar_url}
          alt=""
          className="w-12 h-12 mr-4 border-2 border-gray-600 rounded-full"
        />
        <div className="flex-1">
          <h4 className="dark:text-gray-50 text-lexend">{instructor?.name}</h4>
          <p className="text-sm font-light text-gray-500 dark:text-gray-300">
            {instructor.company}
          </p>
        </div>
        {opened ? (
          <XMarkIcon
            onClick={() => setOpened(!opened)}
            className="w-6 h-6 text-gray-500 cursor-pointer font-extralight dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
          />
        ) : (
          <InformationCircleIcon
            onClick={() => setOpened(!opened)}
            className="w-6 h-6 text-gray-500 cursor-pointer font-extralight hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-300"
          />
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: opened ? 1 : 0,
            height: opened ? "auto" : 0,
            transition: { opacity: { duration: 0.6 } },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: { opacity: { duration: 0.1 } },
          }}
          key={opened ? "open" : "closed"}
          className={`${
            opened ? "visible" : "invisible"
          } text-sm font-light text-gray-500 dark:text-gray-300 relative overflow-hidden`}
        >
          <div className=" [&>p]:mt-0 ">
            <MarkdownRenderer markdown={instructor.bio} />
            <div>
              {instructor.links?.map((link, i) => {
                const Icon = SocialIcons[link.type] ?? null;
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 mr-4 text-sm font-light text-gray-500 dark:text-gray-300"
                  >
                    {Icon && (
                      <Icon className="mt-2 text-2xl text-gray-300 transition hover:text-gray-700 dark:text-gray-700 dark:hover:text-gray-300" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
