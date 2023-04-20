export default function JoinChallengeSection({}: {}) {
  return (
    <article className="relative w-full bg-slate-50 dark:bg-gray-dark shadow-md rounded-lg p-4 pt-3 font-inter border-[1.5px] border-gray-300 dark:border-slate-600">
      <section>
        <span className="font-extralight">
          Você ainda não está participando desse{" "}
        </span>
        <span className="font-bold">mini projeto</span>
      </section>
      <section className="mt-6 flex gap-8"></section>
    </article>
  );
}
