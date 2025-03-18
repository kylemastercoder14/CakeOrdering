import Steps from "@/components/global/steps";
import { ReactNode } from "react";
import Footer from "@/components/global/site/footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex-1 max-w-screen-lg pb-20 mx-auto flex flex-col mt-24">
        <Steps />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
