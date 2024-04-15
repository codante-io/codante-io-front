import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Form, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { ResponsiveHoverCard } from "~/components/ui/responsive-hover-card";
import { cn } from "~/lib/utils/cn";
import BecomeProCard from "./become-pro-card";
import SignInDialog from "~/routes/_layout-app/_trilhas/_components/sign-in-dialog";

interface TrackItemCheckboxProps {
  trackableId: string | number;
  showCheckbox: boolean;
  showTopLine: boolean;
  showBottomLine: boolean;
  completed?: boolean;
  onChange: (event: ChangeEvent<HTMLFormElement>) => void;
  error?: {
    message: string;
    timestamp: string;
    trackableId: string | number;
  };
  userIsPro: boolean;
  userIsLoggedIn: boolean;
  isFree: boolean;
}

function TrackItemCheckbox({
  trackableId,
  showCheckbox,
  showTopLine,
  showBottomLine,
  completed,
  onChange,
  error,
  userIsPro,
  userIsLoggedIn,
  isFree,
}: TrackItemCheckboxProps) {
  const [checked, setChecked] = useState(completed);
  const location = useLocation();

  useEffect(() => {
    if (error?.timestamp && error?.trackableId == trackableId) {
      setChecked((prev) => !prev);
    }
  }, [error?.timestamp, error?.trackableId, trackableId]);

  return (
    <Form
      method="post"
      onChange={onChange}
      className="flex gap-2 items-center flex-col"
    >
      {showCheckbox ? (
        <>
          <div
            className={cn(
              "w-[1px] h-[calc(100%_-_70px)] bg-background-200 dark:bg-background-700",
              showTopLine && "bg-transparent dark:bg-transparent",
            )}
          />
          <input type="hidden" name="trackableId" value={trackableId} />

          <Checkbox
            isPro={userIsPro}
            isFree={isFree}
            isLoggedIn={userIsLoggedIn}
            checked={!!checked}
            onChange={() => setChecked((prev) => !prev)}
            pathname={location.pathname}
          />

          <div
            className={cn(
              "w-[1px] bg-background-200 h-full dark:bg-background-700",
              showBottomLine && "bg-transparent dark:bg-transparent",
            )}
          />
        </>
      ) : (
        <div className="w-8 h-full flex justify-center">
          <div
            className={cn(
              "w-[1px] bg-background-200 h-full dark:bg-background-700",
            )}
          />
        </div>
      )}
    </Form>
  );
}

export default TrackItemCheckbox;

interface CheckboxProps {
  isPro: boolean;
  isFree: boolean;
  isLoggedIn: boolean;
  checked: boolean;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  pathname: string;
}

function Checkbox({
  isPro,
  isFree,
  isLoggedIn,
  checked,
  onChange,
  pathname,
}: CheckboxProps) {
  if (isPro || (isFree && isLoggedIn)) {
    return (
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        className="cursor-pointer w-8 h-8 dark:bg-background-700 dark:border-background-600 dark:checked:bg-green-600 text-green-600 dark:text-green-600 bg-background-100 border-background-200 rounded-full focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-background-800 focus:ring-2 transition-all"
      />
    );
  }

  if (isFree && !isLoggedIn) {
    return (
      <SignInDialog
        trigger={
          <input
            type="checkbox"
            checked={false}
            onChange={(ev) => ev.stopPropagation()}
            className="cursor-pointer w-8 h-8 dark:bg-background-700 dark:border-background-600 dark:checked:bg-green-600 text-green-600 dark:text-green-600 bg-background-100 border-background-200 rounded-full focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-background-800 focus:ring-2 transition-all"
          />
        }
        redirectTo={pathname}
      />
    );
  }

  return <LockedCheckbox />;
}

function LockedCheckbox() {
  return (
    <ResponsiveHoverCard
      trigger={
        <div className="flex items-center justify-center w-8 h-8 border cursor-pointer dark:bg-background-700 dark:border-background-600 bg-background-100 border-background-200 transition-all rounded-full">
          <LockClosedIcon className="w-8 h-8 dark:text-background-600 text-background-300 basis-5" />
        </div>
      }
      cardContent={<BecomeProCard />}
    />
  );
}
