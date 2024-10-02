import React from "react";

interface LoaderProps {
  size?: number;  // Allows changing the size of the loader
}

const Loader: React.FC<LoaderProps> = ({ size = 24 }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`loader`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {[...Array(12)].map((_, index) => (
          <div key={index} className="loader-dot" />
        ))}
      </div>
    </div>
  );
};

export default Loader;
