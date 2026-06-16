import AddPropertyButton from "@/app/components/navbar/AddPropertyButton";
import SearchFilters from "@/app/components/navbar/SearchFilters";
import UserNav from "@/app/components/navbar/UserNav";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b border-gray-300 bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="DjangoBnb Logo"
              width={180}
              height={38}
            />
          </Link>

          <div className="flex space-x-6">
            <SearchFilters />
          </div>

          <div className="flex items-center space-x-6">
            <AddPropertyButton />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
