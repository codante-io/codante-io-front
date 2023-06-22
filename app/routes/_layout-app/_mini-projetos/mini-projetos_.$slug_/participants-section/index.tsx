import type { ChallengeParticipants } from "~/models/challenge.server";

export default function ParticipantsSection({
  className = "",
  participants,
}: {
  className?: string;
  participants: ChallengeParticipants;
}) {
  return (
    <article className={`${className} relative w-full p-4 pt-3 font-inter`}>
      <>
        <h1 className="flex justify-center mt-24 text-2xl font-light text-center font-lexend">
          {participants?.count > 0 ? (
            participants?.count > 1 ? (
              <span>
                Junte-se a outras{" "}
                <span className="font-bold">{participants?.count} pessoas</span>{" "}
                que estão fazendo esse mini projeto.
              </span>
            ) : (
              <span>
                Junte-se a outra pessoa que está fazendo esse mini projeto.
              </span>
            )
          ) : (
            <span>
              Esse mini projeto ainda não tem participantes. Seja a primeira
              pessoa a participar!
            </span>
          )}
        </h1>
        <section className="p-2">
          <div className="flex flex-wrap justify-center -space-x-3 overflow-hidden">
            {participants?.avatars.map((avatar, index) => (
              <img
                key={index}
                className="inline-block w-16 h-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                src={avatar || "https://source.boringavatars.com/"}
                alt=""
              />
            ))}
          </div>
        </section>
      </>
    </article>
  );
}
