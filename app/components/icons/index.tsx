import { type SVGProps } from "react";
import spriteHref from "~/components/icons/sprite.svg";
import { type IconName } from "~/components/icons/names";

export enum IconSize {
  xs = "12",
  sm = "16",
  md = "24",
  lg = "32",
  xl = "40",
}

export type IconSizes = keyof typeof IconSize;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  testId?: string;
  className?: string;
  size?: IconSizes;
}

export function Icon({
  name,
  testId,
  className,
  size = "md",
  ...props
}: IconProps) {
  const iconSize = IconSize[size];
  const iconClasses = `inline-block flex-shrink-0 ${className}`;
  return (
    <svg
      className={iconClasses}
      fill={"currentColor"}
      width={iconSize}
      height={iconSize}
      data-testid={testId}
      data-name={name}
      {...props}
    >
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
