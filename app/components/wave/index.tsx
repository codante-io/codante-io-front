export default function Wave({ position }: { position: "top" | "bottom" }) {
  return position === "bottom" ? (
    <svg
      viewBox="0 0 1440 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative w-full"
    >
      <path
        d="M0 64L48 53.3C96 43 192 21 288 21.3C384 21 480 43 576 58.7C672 75 768 85 864 69.3C960 53 1056 11 1152 5.3C1248 2.86102e-06 1344 32 1392 48L1440 64V-64H1392C1344 -64 1248 -64 1152 -64C1056 -64 960 -64 864 -64C768 -64 672 -64 576 -64C480 -64 384 -64 288 -64C192 -64 96 -64 48 -64H0V64Z"
        className="dark:fill-background-700 fill-background-100"
      />
    </svg>
  ) : (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1722 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_236_492)">
          <path
            d="M-4 28.0754L53.8333 21.7285C111.667 14.9027 227.333 2.92741 343 8.91502C458.667 14.9027 574.333 41.2482 690 66.3962C805.667 91.5442 921.333 117.89 1037 98.3701C1152.67 79.5689 1268.33 14.9027 1384 2.56814C1499.67 -10.2453 1615.33 28.0754 1673.17 47.2358L1731 66.3962V258H1673.17C1615.33 258 1499.67 258 1384 258C1268.33 258 1152.67 258 1037 258C921.333 258 805.667 258 690 258C574.333 258 458.667 258 343 258C227.333 258 111.667 258 53.8333 258H-4V28.0754Z"
            className="dark:fill-background-700 fill-background-100"
          />
        </g>
        <defs>
          <clipPath id="clip0_236_492">
            <rect
              width="1726"
              height="258"
              fill="white"
              transform="translate(-4)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
