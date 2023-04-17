export default function CardItemLessonsCount({
  lessonsCount,
  className,
}: {
  lessonsCount: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 mb-2 ${className}`}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dark:stroke-zinc-300 stroke-gray-500"
      >
        <path
          d="M3.55 8.45583C3.32079 10.2105 3.18421 11.976 3.14083 13.745C5.53982 14.7471 7.8368 15.9778 10 17.42C12.1635 15.9777 14.4607 14.7471 16.86 13.745C16.8166 11.976 16.68 10.2105 16.4508 8.45583M16.4508 8.45583C17.18 8.21083 17.9192 7.98416 18.6658 7.77749C15.9463 5.87103 13.0433 4.24073 10 2.91083C6.95666 4.24101 4.05366 5.87159 1.33417 7.77833C2.07857 7.98382 2.81718 8.20974 3.54917 8.45583C5.77305 9.20343 7.93078 10.135 10 11.2408C12.069 10.135 14.2272 9.20349 16.4508 8.45583ZM5.625 12.5C5.79076 12.5 5.94973 12.4341 6.06694 12.3169C6.18415 12.1997 6.25 12.0408 6.25 11.875C6.25 11.7092 6.18415 11.5503 6.06694 11.4331C5.94973 11.3158 5.79076 11.25 5.625 11.25C5.45924 11.25 5.30027 11.3158 5.18306 11.4331C5.06585 11.5503 5 11.7092 5 11.875C5 12.0408 5.06585 12.1997 5.18306 12.3169C5.30027 12.4341 5.45924 12.5 5.625 12.5ZM5.625 12.5V9.43749C7.03895 8.55861 8.49941 7.75688 10 7.03583M4.16083 16.6608C4.62581 16.197 4.99453 15.6458 5.2458 15.039C5.49708 14.4322 5.62594 13.7818 5.625 13.125V11.875"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="text-xs dark:text-zinc-300 text-gray-500">
        {lessonsCount} aulas
      </span>
    </div>
  );
}
