"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const email = data.email as string
    const password = data.password as string

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error?.message || "Invalid email or password!");
        return;
      } else {
        toast.success(`Welcome back ${data?.user?.name}`);
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }

    } catch (error) {
      console.error(`betterAuth Login Error: ${error}`);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(`Google Sign In Error: ${error}`);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-white font-sans py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full space-y-8 bg-slate-50 p-8 rounded-lg border border-slate-200 shadow-sm">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back to <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">ReTech</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-brand-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>


        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <FiMail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                required
                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-brand-primary transition-all font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <FiLock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="block w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-brand-primary transition-all font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 active:scale-[0.98] rounded-lg transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Social Login Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center space-x-2 py-3 border border-slate-200 hover:border-slate-300 bg-white rounded-lg transition-all cursor-pointer shadow-xs hover:shadow-sm disabled:opacity-50"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm font-bold text-slate-700">Google</span>
        </button>

      </div>
    </div>
  );
}