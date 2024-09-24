import { ManropeFont, OpenSans } from "@/fonts/Fonts";
import { cn } from "@/utils/cn";
import { FC, PropsWithChildren } from "react";

const variantsMapping = {
  "text-6xl": "h1",
  "text-5xl": "h2",
  "text-4xl": "h3",
  "text-3xl": "h4",
  "text-2xl": "h5",
  "text-xl": "h6",
  "text-lg": "p",
  "text-base": "p",
  "text-sm": "p",
  "text-xs": "p"
};

export interface TypographyProps {
  weight?: "light" | "reguler" | "medium" | "semi-bold" | "bold" | "extra-bold";
  className?: string;
  variant?:
    | "text-xs"
    | "text-sm"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "text-5xl"
    | "text-6xl";
}

const Typography: FC<PropsWithChildren<TypographyProps>> = (props) => {
  const {
    variant = "text-xl",
    weight = "reguler",
    children,
    className
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = variant ? variantsMapping[variant] : "p";
  const font =
    variant === "text-xl" ||
    variant === "text-2xl" ||
    variant === "text-3xl" ||
    variant === "text-4xl" ||
    variant === "text-5xl" ||
    variant === "text-6xl"
      ? ManropeFont.className
      : OpenSans.className;
  return (
    <Component
      className={cn(
        font,
        {
          " text-[60px] leading-[72px]": variant === "text-6xl",
          " text-[48px] leading-[60px]": variant === "text-5xl",
          " text-[36px] leading-[40px]": variant === "text-4xl",
          " text-[30px] leading-[36px]": variant === "text-3xl",
          " text-[24px] leading-[32px]": variant === "text-2xl",
          " text-[20px] leading-[28px]": variant === "text-xl",
          " text-[18px] leading-[28px]": variant === "text-lg",
          " text-[16px] leading-[20px]": variant === "text-base",
          " text-[14px] leading-[20px]": variant === "text-sm",
          " text-[12px] leading-[16px]": variant === "text-xs"
        },
        {
          "font-light": weight === "light",
          "font-reguler": weight === "reguler",
          "font-medium": weight === "medium",
          "font-semibold": weight === "semi-bold",
          "font-bold": weight === "bold",
          "font-extrabold": weight === "extra-bold"
        },
        className ?? ""
      )}
    >
      {children}
    </Component>
  );
};

export default Typography;
