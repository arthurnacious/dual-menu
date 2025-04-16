import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default MainLayout;
