export default function PlayerGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid max-w-[1600px] mx-auto bg-background-900 grid-cols-1">
      {children}
    </div>
  );
}
