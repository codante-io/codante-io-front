interface BoldColoredProps {
  children: React.ReactNode;
  color: string;
}

export const BoldColored = ({ children, color }: BoldColoredProps) => (
  <span className="border-b font-bold" style={{ borderColor: color }}>
    {children}
  </span>
);
