import AdvancedIcon from "./advanced.svg";
import IntermediateIcon from "./intermediate.svg";
import NewbieIcon from "./newbie.svg";

import AdvancedOrangeIcon from "./advanced-orange.svg";
import IntermediateOrangeIcon from "./intermediate-orange.svg";
import NewbieOrangeIcon from "./newbie-orange.svg";

interface LevelIconProps {
  level: 1 | 2 | 3;
  color?: "purple" | "orange";
}

const icons = {
  1: NewbieIcon,
  2: IntermediateIcon,
  3: AdvancedIcon,
};

const orangeIcons = {
  1: NewbieOrangeIcon,
  2: IntermediateOrangeIcon,
  3: AdvancedOrangeIcon,
};

const LevelIcon = ({ level, color = "purple" }: LevelIconProps) => {
  return (
    <img
      src={color === "orange" ? orangeIcons[level] : icons[level]}
      alt={`Level ${level} icon - ${color} color`}
    />
  );
};
export default LevelIcon;
