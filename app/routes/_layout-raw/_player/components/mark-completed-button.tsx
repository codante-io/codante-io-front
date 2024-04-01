import { useFetcher } from "@remix-run/react";
import type { MouseEvent } from "react";
import { toast } from "react-hot-toast";
import { BsSquare } from "react-icons/bs";
import type { Lesson } from "~/lib/models/lesson.server";
import pop from "~/lib/sounds/pop.wav";
import useSound from "use-sound";

export default function MarkCompletedButton({ lesson }: { lesson: Lesson }) {
  const fetcher = useFetcher();
  const [popSound] = useSound(pop, { volume: 0.3 });

  function handleCheckClick(
    event: MouseEvent<HTMLButtonElement>,
    lessonId: string,
    markCompleted: boolean,
  ) {
    event.preventDefault();
    try {
      fetcher.submit(
        { lessonId, markCompleted: markCompleted.toString() },
        {
          method: "POST",
          action: "/api/set-watched?index",
        },
      );
      popSound();
      if (markCompleted) {
        toast.success("Aula marcada como concluída");
      } else {
        toast.success("Aula desmarcada");
      }
    } catch (error) {
      toast.error("Erro ao marcar aula...");
    }
  }

  return (
    <button
      onClick={(event) =>
        handleCheckClick(event, lesson.id, lesson.user_completed ? false : true)
      }
      className="mr-4"
    >
      {lesson.user_completed ? (
        <BsCheckSquare />
      ) : (
        <BsSquare className="transition-all hover:text-brand hover:scale-110" />
      )}
    </button>
  );
}

function BsCheckSquare() {
  return (
    <svg
      className="transition-all hover:text-brand group hover:scale-110"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
    >
      <g fill="currentColor">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
        <path
          className="fill-green-700 group-hover:fill-brand"
          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425a.235.235 0 0 1 .02-.022z"
        ></path>
      </g>
    </svg>
  );
}
