export default function ParticipantsCounter({
  currentUserIsEnrolled,
  participantsCount,
}: {
  currentUserIsEnrolled: boolean;
  participantsCount: number;
}) {
  // se currentUserIsEnrolled, participantsCount sempre será > 0

  if (currentUserIsEnrolled && participantsCount > 1) {
    return (
      <span>
        Você e mais{" "}
        <span className="font-bold">
          {`${
            participantsCount === 2
              ? "uma pessoa "
              : `${participantsCount - 1} pessoas `
          }`}
        </span>
        estão fazendo esse mini projeto.
      </span>
    );
  }

  if (currentUserIsEnrolled && participantsCount === 1) {
    return <span>Você é o primeiro a participar deste mini projeto.</span>;
  }

  if (!currentUserIsEnrolled && participantsCount > 1) {
    return (
      <span>
        Junte-se a outras{" "}
        <span className="font-bold">{participantsCount} pessoas</span> que estão
        fazendo esse mini projeto.
      </span>
    );
  }

  if (!currentUserIsEnrolled && participantsCount === 1) {
    return (
      <span>Junte-se a outra pessoa que está fazendo esse mini projeto.</span>
    );
  }

  return (
    <span>
      Esse mini projeto ainda não tem participantes. Seja a primeira pessoa a
      participar!
    </span>
  );
}
