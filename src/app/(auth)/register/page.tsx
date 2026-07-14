"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { IoMdCheckmarkCircle, IoMdRadioButtonOff } from "react-icons/io";

export default function RegisterPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password validation rules (Dynamic checked)
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isLengthValid = password.length >= 8;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isLengthValid || !hasUppercase || !hasLowercase || !hasNumber) {
      toast.error("Password does not meet all security requirements.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const name = data.name as string;
    const email = data.email as string;
    const passwordValue = data.password as string;

    if (!name || !email || !passwordValue) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const { data: resData, error } = await authClient.signUp.email({
        name,
        email,
        password: passwordValue
      });

      if (error) {
        toast.error(error?.message || "Registration failed!");
        return;
      } else {
        toast.success(`Welcome ${resData?.user?.name}`);
        router.push('/');
        router.refresh();
      }

    } catch (error) {
      console.error(`betterAuth Function Error: ${error}`);
      toast.error("An unexpected error occurred.");
    }
  }

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: '/',
    });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full space-y-8 bg-slate-50 p-8 rounded-lg border border-slate-200 shadow-sm">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-brand-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <FiUser className="w-4 h-4" />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-brand-primary transition-all font-medium"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <FiMail className="w-4 h-4" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-brand-primary transition-all font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <FiLock className="w-4 h-4" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Password Real-time Checklist UI with Premium React Icons */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-3 pb-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className={`flex items-center gap-2 ${isLengthValid ? "text-green-600 font-semibold" : "text-gray-400 font-normal"}`}>
              {isLengthValid ? <IoMdCheckmarkCircle className="text-base shrink-0 text-green-600" /> : <IoMdRadioButtonOff className="text-base shrink-0 text-gray-300" />}
              <span>Min 8 characters</span>
            </div>
            <div className={`flex items-center gap-2 ${hasUppercase ? "text-green-600 font-semibold" : "text-gray-400 font-normal"}`}>
              {hasUppercase ? <IoMdCheckmarkCircle className="text-base shrink-0 text-green-600" /> : <IoMdRadioButtonOff className="text-base shrink-0 text-gray-300" />}
              <span>One uppercase</span>
            </div>
            <div className={`flex items-center gap-2 ${hasLowercase ? "text-green-600 font-semibold" : "text-gray-400 font-normal"}`}>
              {hasLowercase ? <IoMdCheckmarkCircle className="text-base shrink-0 text-green-600" /> : <IoMdRadioButtonOff className="text-base shrink-0 text-gray-300" />}
              <span>One lowercase</span>
            </div>
            <div className={`flex items-center gap-2 ${hasNumber ? "text-green-600 font-semibold" : "text-gray-400 font-normal"}`}>
              {hasNumber ? <IoMdCheckmarkCircle className="text-base shrink-0 text-green-600" /> : <IoMdRadioButtonOff className="text-base shrink-0 text-gray-300" />}
              <span>One number</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 active:scale-[0.98] rounded-lg transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase">Or signup with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Social Login */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center space-x-2 py-3 border border-slate-200 hover:border-slate-300 bg-white rounded-lg transition-all cursor-pointer shadow-xs hover:shadow-sm"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm font-bold text-slate-700">Google</span>
        </button>
        <p className="text-center text-sm text-gray-600 pt-1">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}