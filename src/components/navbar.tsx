"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import shortifylogo from "../../public/shortify logo.webp";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="flex justify-between px-6 md:px-10 lg:px-20 py-9 md:py-12">
        <div className="flex items-center justify-center md:gap-x-8 lg:gap-x-14">
          <Link href="/">
            <Image src={shortifylogo} alt="Shortify_logo" />
          </Link>
          <ul className="text-GrayishViolet text-base font-medium hidden md:flex md:gap-x-8 lg:gap-x-10">
            <li>
              <a href="#">Components</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex md:gap-x-8 lg:gap-x-10 items-center">
          <Link
            href="/login"
            className="font-medium text-base text-GrayishViolet"
          >
            Login
          </Link>

          <Link href="/signup">
            <button
              type="button"
              title="sign up"
              className="py-2 px-5 rounded-full"
            >
              Sign up
            </button>
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-VeryDarkViolet bg-transparent">
            {menuOpen ? <MdOutlineClose size={30} /> : <IoMenu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="bg-DarkViolet text-white md:hidden absolute top-20 right-5 w-[90%] rounded-lg h-20vh flex flex-col items-center justify-center space-y-4 z-50 py-4 ">
          <ul className="flex flex-col items-center gap-y-4">
            <li>
              <a href="#" className="text-white font-medium">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-white font-medium">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-white font-medium">
                Resources
              </a>
            </li>
          </ul>
          <div className="bg-[#9E9AA8] h-[2px] w-[80%]"></div>
          <div className="flex flex-col items-center gap-y-4 w-full">
            <Link href="/login" className="font-medium text-base text-white">
              Login
            </Link>

            <Link href="/signup" className="w-full flex justify-center ">
              <button
                type="button"
                title="sign up"
                className="py-2 px-5 rounded-full w-[80%]"
              >
                Sign up
              </button>
            </Link>
          </div>
          <div className="md:hidden"></div>
        </div>
      )}
    </header>
  );
}

export default NavBar;