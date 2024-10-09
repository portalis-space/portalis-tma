import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperStyle?: string;
  headingIcon?: React.ReactElement;
  trailingIcon?: React.ReactElement;
};

const InputWithIcon: React.FC<InputProps> = ({wrapperStyle, className, headingIcon, trailingIcon, ...props}) => 
  <div className={`bg-neutral-200 dark:bg-neutral-800 rounded-xl px-2 flex flex-row items-center w-full ${wrapperStyle ? wrapperStyle : ''}`}>
    {
      headingIcon && headingIcon
    }
    <input className={`bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 w-full rounded-xl px-5 py-3 border-transparent outline-none focus:border-transparent focus:ring-0 focus:outline-none ${className ? className : ''}`} {...props}/>
    {
      trailingIcon && trailingIcon
    }
  </div>

export default InputWithIcon;
