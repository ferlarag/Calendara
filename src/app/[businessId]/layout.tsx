import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;
