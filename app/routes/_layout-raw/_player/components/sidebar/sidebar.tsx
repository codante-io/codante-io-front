import { useClickOutside } from "@mantine/hooks";

type SidebarProps = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

export default function Sidebar({
  children,
  // isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const ref = useClickOutside(() => setIsSidebarOpen(false));

  return (
    <div className="relative">
      <div
        ref={ref}
        className={`sticky top-10 z-10 pb-12  duration-500 transition-all  lg:opacity-100 lg:flex  lg:visible flex flex-col  h-[calc(100vh)] overflow-auto scrollbar-transparent scrollbar pr-4 `}
      >
        <div className="relative  ">
          <div ref={ref} className="inset-0 flex flex-col gap-8 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
