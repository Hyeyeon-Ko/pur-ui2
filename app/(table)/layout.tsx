// import Image from "next/image";
// import Navbar from "@/components/layouts/Navbar";
import SideMenu from "@/components/layouts/SideMenu";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 lg:justify-start"
        >
          {/* <Image src="" alt="logo" width={32} height={32} /> */}
          <span className="hidden lg:block">side menu</span>
        </Link>
        <SideMenu />
      </div>
      {/* right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
        {/* <Navbar /> */}
        {children}
      </div>
    </div>
  );
}
