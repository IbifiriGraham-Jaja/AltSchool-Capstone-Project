"use client";
import Link from "next/link";
import { useState } from "react";
import Aside from "@/components/aside";
import Image from "next/image";
import Shortifylogo from "../../../public/shortify logo.webp";
import { login } from "./actions";
import { HashLoader } from "react-spinners";

function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Calling the server action directly
    const result = await login(formData);

    if (result?.error) {
      setLoading(false);
      setError(result.error);
    } else {
      setLoading(false);
      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    }
  };

  return (
    <section className="flex">
      <Aside />
      <div className="bg-Gray md:bg-white flex flex-col items-center w-full md:w-[55%] justify-center h-screen relative">
        <Link href="/">
          <Image
            src={Shortifylogo}
            alt="shortify logo"
            className="absolute top-7 right-6 md:absolute md:top-7 md:right-6 lg:absolute lg:top-12 lg:right-20"
          />
        </Link>
        <div className="w-[80%] lg:w-[60%]">
          <h1 className="mb-2 font-extrabold text-xl md:text-2xl lg:text-3xl text-center text-VeryDarkBlue">
            Login
          </h1>
          <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-VeryDarkBlue">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <label htmlFor="password" className="text-VeryDarkBlue">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />

            {error && <span className="text-red-500">{error}</span>}
            <button
              type="submit"
              className="p-2 rounded-lg mt-2 text-base h-10 flex justify-center items-center"
            >
              {loading ? <HashLoader color="#fff" size={20} /> : "Login"}
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-VeryDarkBlue">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-cyan">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;