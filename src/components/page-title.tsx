import React, { type ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}
const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <div className="h-[60px]">
      <h1 className="text-4xl font-semibold">{children}</h1>
    </div>
  );
};

export default PageTitle;
