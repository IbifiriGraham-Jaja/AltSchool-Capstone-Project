import Image from "next/image";
import working from "../../public/working_with_computer.webp";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between md:pl-10 lg:pl-20 mt-7 pb-32 md:pb-40">
      <div className="self-center text-center mt-8 md:mt-0 md:text-start md:max-w-2xl">
        <h1 className="font-bold text-5xl lg:text-7xl text-VeryDarkBlue leading-tight -tracking-[2px]">
        Elevate Your Links Beyond Shortening
        </h1>
        <p className="font-medium text-[#9DA3A8] leading-8 w-[80%] text-xl mt-3">
        Boost Your Brand's Presence And Track Link Performance With Precision.
        </p>
        <Link href="/signup">
          <button type="button" title="get started" className="py-2 px-8 rounded-full mt-5 bg-[#68A7AD] text-white">
            Get Started
          </button>
        </Link>
      </div>
      <div className="desk-lady">
        <Image src={working} width={850} height={482} alt="working woman" />
      </div>
    </section>
  );
}

export default HeroSection;
