import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 flex justify-between items-center text-white font-semibold">
      <div className="flex items-center space-x-2">
        <Image src="/maple.png" width={30} height={15} alt="Logo" />
      </div>

      <div className="hidden md:inline font-light" style={{ fontFamily: "Poppins, sans-serif" }}>
        Blog
      </div>
      <span className="md:inline">Muhammed Hashir</span>
    </nav>
  );
};

export default Navbar;
