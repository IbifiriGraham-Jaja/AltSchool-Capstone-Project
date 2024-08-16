import HeroSection from "../components/hero";
import NavBar from "../components/navbar";
import { FirstFooter, SecondFooter } from "../components/footer";
import Stats from "@/components/shortener";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <Stats />
      </main>
      <footer>
        <FirstFooter />
        <SecondFooter />
      </footer>
    </>
  );
}