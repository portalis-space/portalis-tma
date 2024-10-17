import React from "react";

type Props = {
  className?: string
}

const Loader: React.FC<Props> = ({className}) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`loader after:bg-neutral-200 dark:after:bg-neutral-800 mt-10 ${className}`}
      >
        {[...Array(4)].map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
};

export default Loader;
