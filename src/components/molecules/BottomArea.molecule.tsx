import React from "react";

const BottomArea = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bottom-16 fixed w-full md:w-3/4 lg:w-2/3 xl:w-1/2 px-2 pt-2 z-[2]">
      {children}
    </div>
  );
}

export default BottomArea;