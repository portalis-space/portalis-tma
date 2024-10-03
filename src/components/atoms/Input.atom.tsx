import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
};

const Input: React.FC<InputProps> = ({className ,...props}) => <input className={`bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-5 py-3 rounded-xl border-transparent outline-none focus:border-transparent focus:ring-0 focus:outline-none ${className ? className : ''}`} {...props}/>;

export default Input;
