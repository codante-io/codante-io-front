import { Link, useFetcher } from "react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { BsFillHeartFill, BsTools } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import type { UserAvatar, UserProfile } from "~/lib/models/user.server";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import { formatName } from "~/lib/utils/format-name";
import ProBadge from "~/components/ui/pro-badge";

export default function UserAvatarHoverCard({
  avatar,
  children,
  profileTarget = "_self",
}: {
  avatar: UserAvatar;
  children: React.ReactNode;
  profileTarget?: "_self" | "_blank";
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const fetcher = useFetcher<UserProfile>();
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCard = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY - 8,
          left: rect.left + window.scrollX + rect.width / 2,
        });
      }
      setIsOpen(true);
      if (!hasLoaded && avatar.github_user && fetcher.state === "idle") {
        fetcher.load(`/user-profile?github_user=${avatar.github_user}`);
        setHasLoaded(true);
      }
    }, 300);
  }, [hasLoaded, avatar.github_user, fetcher]);

  const closeCard = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }, []);

  const keepOpen = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (isMobile || !avatar.github_user) {
    return <>{children}</>;
  }

  const profile = fetcher.data;

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={openCard}
        onMouseLeave={closeCard}
        className={isOpen ? "relative z-20" : "relative"}
      >
        {children}
      </span>
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            onMouseEnter={keepOpen}
            onMouseLeave={closeCard}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              transform: "translate(-50%, -100%)",
              zIndex: 9999,
            }}
            className="animate-in fade-in-0 zoom-in-95 duration-150"
          >
            <div className="w-64 rounded-xl border border-background-200 dark:border-background-600 bg-background-50 dark:bg-background-800 p-4 shadow-xl">
              <Link
                to={`/perfil/${avatar.github_user}`}
                prefetch="intent"
                target={profileTarget}
                rel={profileTarget === "_blank" ? "noreferrer" : undefined}
                className="block"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      avatar.avatar_url ||
                      "https://screenshot-service1.codante.io/avatars/sm"
                    }
                    alt={avatar.name}
                    className={`w-10 h-10 rounded-full bg-background-400 shrink-0 ${
                      avatar.badge === "pro"
                        ? "ring-2 ring-amber-400"
                        : avatar.badge === "admin"
                          ? "ring-2 ring-brand-500"
                          : "ring-2 ring-white dark:ring-gray-700"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {formatName(avatar.name)}
                      </span>
                      {avatar.badge === "pro" && <ProBadge />}
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      @{avatar.github_user}
                    </span>
                  </div>
                </div>

                {fetcher.state === "loading" && (
                  <div className="flex gap-4 animate-pulse">
                    <div className="h-4 w-16 rounded bg-background-200 dark:bg-background-700" />
                    <div className="h-4 w-16 rounded bg-background-200 dark:bg-background-700" />
                    <div className="h-4 w-16 rounded bg-background-200 dark:bg-background-700" />
                  </div>
                )}

                {profile && (
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <BsTools className="w-3 h-3 text-brand-500" />
                      {profile.stats.completed_challenge_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <BsFillHeartFill className="w-3 h-3 text-brand-500" />
                      {profile.stats.received_reaction_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMedal className="w-3 h-3 text-brand-500" />
                      {profile.stats.points}
                    </span>
                  </div>
                )}

                <span className="mt-2 block text-[10px] text-brand-400 hover:underline">
                  Ver perfil completo
                </span>
              </Link>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
