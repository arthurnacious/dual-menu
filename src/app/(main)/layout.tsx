import DynamicSidebar from "@/components/main/side-bar";
import TopBar from "@/components/main/top-bar";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <TopBar />
      <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="flex">
          <DynamicSidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
