import Navbar from "../Navigation/Navbar";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className=" flex justify-center">
      {/* Rendered on mobile only with md:hidden */}
      <Navbar />
      <div className="flex-[4] lg:flex-[5] relative">{children}</div>
    </div>
  );
};
export default MainLayout;
