import { IconType } from "react-icons";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { Card } from "~/components/ui/cards/card";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import type { Instructor } from "~/lib/models/instructor.server";

export default function InstructorCard({
  instructor,
}: {
  instructor: Instructor;
}) {
  return (
    <div className=" transition rounded-lg hover:bg-background-150 dark:hover:bg-background-800 ">
      <div className="flex items-center gap-4">
        <img
          src={instructor?.avatar_url}
          alt=""
          className="w-8 h-8 border-2 border-gray-600 rounded-full"
        />
        <div className="text-left">
          <h4 className="dark:text-gray-500 text-lexend text-xs font-bold ">
            {instructor?.name}
          </h4>
          <p className="text-xs font-light text-gray-500 dark:text-gray-400">
            {instructor.company}
          </p>
        </div>
        <IoInformationCircleOutline className="inline-block ml-2 w-5 h-5 align-text-top" />
      </div>
    </div>
  );
}

export function InstructorCardContent({
  bio,
  links,
}: {
  bio: string;
  links?: {
    url: string;
    type: string;
  }[];
}) {
  const SocialIcons: { [key: string]: IconType } = {
    github: AiFillGithub,
    twitter: AiFillTwitterCircle,
    linkedin: AiFillLinkedin,
    website: MdComputer,
  };

  return (
    <Card className="text-sm p-4 min-w-64">
      <div className="text-sm font-light text-gray-500 dark:text-gray-300 relative overflow-hidden">
        <div className=" [&>p]:mt-0 ">
          {bio && (
            <MarkdownRenderer
              markdown={bio}
              wrapperClasses="prose-p:text-sm prose-p:text-gray-400 prose-p:mt-0"
            />
          )}
          <div>
            {links?.map((link) => {
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
                    <Icon className="mt-2 text-2xl text-gray-400 transition hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
