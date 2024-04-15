import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { ResponsiveHoverCard } from "~/components/ui/responsive-hover-card";
import { cn } from "~/lib/utils/cn";
import BecomeProCard from "./become-pro-card";
import BecomeProDialog from "~/routes/_layout-app/_trilhas/_components/become-pro-dialog";

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
  showBlockedCheckbox: boolean;
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
  showBlockedCheckbox,
}: TrackItemCheckboxProps) {
  const [checked, setChecked] = useState(completed);

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
          {userIsPro ? (
            <input
              type="checkbox"
              onChange={() => setChecked((prev) => !prev)}
              checked={checked}
              className="cursor-pointer w-8 h-8 dark:bg-background-700 dark:border-background-600 dark:checked:bg-green-600 text-green-600 dark:text-green-600 bg-background-100 border-background-200 rounded-full focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-background-800 focus:ring-2 transition-all"
            />
          ) : (
            <BlockedCheckbox showBlockedCheckbox={showBlockedCheckbox} />
          )}

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

function BlockedCheckbox({ showBlockedCheckbox = false }) {
  return showBlockedCheckbox ? (
    <BecomeProDialog
      trigger={
        <input
          type="checkbox"
          checked={false}
          onChange={(ev) => ev.stopPropagation()}
          className="cursor-pointer w-8 h-8 dark:bg-background-700 dark:border-background-600 dark:checked:bg-green-600 text-green-600 dark:text-green-600 bg-background-100 border-background-200 rounded-full focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-background-800 focus:ring-2 transition-all"
        />
      }
    />
  ) : (
    <LockedCheckbox />
  );
}
