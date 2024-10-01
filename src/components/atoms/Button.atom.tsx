import React, { FC, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";
import { AventaBlack, AventaBold } from "@/fonts/Fonts";
import Image from "next/image";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "outlined" | "filled" | "tinted";
  size?: "large" | "medium" | "small";
  loading?: boolean;
}
const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    className = '',
    children,
    onClick,
    disabled = false,
    variant = "filled",
    size = "large",
    loading = false,
  } = props;

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        // base style
        size === "small" ? AventaBlack.className : AventaBold.className,
        " inline-flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out",
        {
          "w-full py-3 text-sm font-semibold rounded-lg": size === "large",
          "text-xs font-normal rounded-full max-w-[176px] w-full":
            size === "medium",
          "py-[10px] px-4 text-xs rounded-full": size === "small",
        },
        {
          "bg-primary-purple-105 border-[2px] border-transparent text-neutral-200 hover:bg-neutral-200 hover:text-primary-purple-105  hover:border-primary-purple-105":
            variant === "filled",
          "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 border-[2px] border-neutral-900 dark:border-neutral-100":
            variant === "outlined",
          "text-neutral-800 dark:text-neutral-200": variant === "tinted",
          "bg-neutral-500 text-neutral-900 border-transparent":
            loading,
          "cursor-not-allowed bg-neutral-300 text-neutral-400 hover:text-neutral-400 hover:border-none hover:bg-neutral-300":
            disabled,
        },
        className
      )}
      onClick={onClick}
    >
      {!loading && children}
      {loading && 
        <Image
          src="/assets/gif/load.gif"
          width={0}
          height={0}
          alt="loader"
          priority
          className="w-4 h-4"
          unoptimized
        />
      }
    </button>
  );
};

export default Button;
