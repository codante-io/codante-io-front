export default function MainArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`w-full relative min-h-screen flex lg:grid transition-all duration-500 lg:grid-cols-[350px,1fr] gap-6   justify-center  lg:min-h-[calc(100vh-200px)]  `}
    >
      {children}
    </div>
  );
}
