export default function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 26 26"
      className={className}
    >
      <g fill="currentColor">
        <path
          fillRule="evenodd"
          d="M13.5 26C20.404 26 26 20.404 26 13.5S20.404 1 13.5 1S1 6.596 1 13.5S6.596 26 13.5 26Zm0-2C19.299 24 24 19.299 24 13.5S19.299 3 13.5 3S3 7.701 3 13.5S7.701 24 13.5 24Z"
          clipRule="evenodd"
          opacity=".2"
        />
        <g opacity=".2">
          <path
            fillRule="evenodd"
            d="M14 11a2 2 0 0 1 2 2v7a2 2 0 1 1-4 0v-7a2 2 0 0 1 2-2Z"
            clipRule="evenodd"
          />
          <path d="M16 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
        </g>
        <path
          fillRule="evenodd"
          d="M13.25 10.75a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
        <path d="M14.5 7.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0Z" />
        <path
          fillRule="evenodd"
          d="M13 24.5c6.351 0 11.5-5.149 11.5-11.5S19.351 1.5 13 1.5S1.5 6.649 1.5 13S6.649 24.5 13 24.5Zm0 1c6.904 0 12.5-5.596 12.5-12.5S19.904.5 13 .5S.5 6.096.5 13S6.096 25.5 13 25.5Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
}
