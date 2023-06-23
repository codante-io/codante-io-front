import type { Lesson } from "~/models/lesson.server";

export default function ProgressBar({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="pr-4 mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{
            width: `${
              (lessons.filter((l) => l.user_completed).length * 100) /
              lessons.length
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
}
