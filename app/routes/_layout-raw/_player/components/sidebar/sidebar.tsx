import { useEffect, useRef } from "react";
import { useOnClickOutside } from "~/lib/hooks/useOnClickOutside";
import { cn } from "~/lib/utils/cn";

type SidebarProps = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  mobileNavSidebarButtonRef: any;
};

export default function Sidebar({
  children,
  isSidebarOpen = true,
  setIsSidebarOpen,
  mobileNavSidebarButtonRef,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Navbar */}
      <MobileSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        mobileNavSidebarButtonRef={mobileNavSidebarButtonRef}
      >
        {children}
      </MobileSidebar>
      {/* Desktop Navbar */}
      <DesktopSidebar>{children}</DesktopSidebar>
    </>
  );
}

function DesktopSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "top-10 z-10 pb-[160px]  duration-500 transition-all h-[calc(100vh)] overflow-auto scrollbar-transparent scrollbar pr-4",
        "hidden", // mobile
        "lg:opacity-100 lg:flex lg:visible   lg:flex-col lg:sticky", // desktop
      )}
    >
      <div className="relative ">
        <div className="inset-0 flex flex-col gap-8 ">{children}</div>
      </div>
    </div>
  );
}

function MobileSidebar({
  children,
  isSidebarOpen,
  setIsSidebarOpen,
  mobileNavSidebarButtonRef,
}: {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  mobileNavSidebarButtonRef: any;
}) {
  const ref = useRef(null);

  useOnClickOutside(
    ref,
    () => setIsSidebarOpen(false),
    undefined,
    mobileNavSidebarButtonRef,
  );

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {};
  }, [isSidebarOpen]);

  return (
    <div
      className={cn(
        "top-10 z-10 pb-[160px] duration-500 transition-all h-[calc(100vh)] overflow-auto overscroll-contain scrollbar-transparent scrollbar pr-4",
        "absolute top-0 z-50 bg-background-50 dark:bg-background-900 w-[320px] border-r border-r-background-700 ", // mobile
        isSidebarOpen && "translate-x-0 visible",
        !isSidebarOpen && "-translate-x-full invisible", // mobile
        "lg:hidden", // desktop
      )}
    >
      <div className="relative ">
        <div
          className="inset-0 flex flex-col gap-8"
          ref={isSidebarOpen ? ref : null}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
