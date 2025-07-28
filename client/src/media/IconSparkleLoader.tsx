import React from "react";
import cn from "../utils/TailwindMergeAndClsx";
import sparkle from "../../public/sparkle.svg";

interface Props {
  className?: string;
  isBlack?: boolean;
}

const IconSparkleLoader = ({ className, isBlack = false }: Props) => {
  return (
    <img
      src={sparkle}
      alt="loader"
      className={cn(isBlack ? "filter invert" : "", className)}
    />
  );
};

export default IconSparkleLoader;
