import Blog from "@/components/blog/Blog";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Blog />
    </div>
  );
}
