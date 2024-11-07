interface BoldColoredProps {
  children: React.ReactNode;
  color: string;
  wavy?: boolean;
}

export const BoldColored = ({ children, color, wavy }: BoldColoredProps) => (
  <span
    className="color-underline"
    style={{
      textDecorationColor: color,
      textDecorationStyle: wavy ? "wavy" : "solid",
    }}
  >
    {children}
  </span>
);
