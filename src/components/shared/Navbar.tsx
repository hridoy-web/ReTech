"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiUser, FiLogOut, FiLayers } from "react-icons/fi";
import Logo from "../ui/logo";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";


export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { data: session } = useSession()
  const user = session?.user
  // console.log(user);

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/login')
    router.refresh()
  }

  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Explore Tech", path: "/explore" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const protectedRoutes = [
    { name: "Home", path: "/" },
    { name: "Explore Tech", path: "/explore" },
    { name: "Add Gadget", path: "/items/add" },
    { name: "Manage Inventory", path: "/items/manage" },
    { name: "About Us", path: "/about" },
  ];

  const activeRoutes = user ? protectedRoutes : publicRoutes;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 font-sans">

      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between h-20">

          {/* Reusable Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {activeRoutes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`relative font-bold transition-colors duration-200 py-1 ${isActive
                    ? "text-brand-primary nav-link-active"
                    : "text-slate-600 hover:text-brand-primary"
                    }`}
                >
                  {route.name}
                  {!isActive && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary transform scale-x-0 origin-bottom-left transition-transform duration-200 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Buttons  */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              /* User Profile Dropdown */
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center space-x-3 p-1.5 pr-3  border border-slate-200 hover:border-brand-primary/40 bg-slate-50 hover:bg-white transition-all duration-200 cursor-pointer"
                >
                  <div className="relative h-9 w-9 border-2 border-indigo-100 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={user?.image || '/images/user-icon-logo.png'}
                      alt={user?.name || 'expense tracker user logo'}
                      fill
                      className="object-cover"
                      sizes="36px"
                      priority
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{user?.name.split(" ")[0]}</span>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-3 shadow-xl bg-white border border-slate-100 rounded-lg w-64 mt-3 z-50 animate-fadeIn"
                >
                  <li className="px-3 py-2 border-b border-slate-100 mb-2 pointer-events-none">
                    <p className="text-sm font-bold text-slate-800 p-0 m-0">{user?.name}</p>
                    <p className="text-xs text-slate-500 p-0 m-0 overflow-hidden text-ellipsis">{user?.email}</p>
                  </li>

                  <li>
                    <Link href="/profile" className="flex items-center space-x-2 py-2.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-primary font-medium text-sm">
                      <FiUser className="w-4 h-4 text-slate-900" />
                      <span className="font-bold text-slate-600">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/items/manage" className="flex items-center space-x-2 py-2.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-brand-primary font-medium text-sm">
                      <FiLayers className="w-4 h-4 text-slate-900" />
                      <span className="font-bold text-slate-600">My Listings</span>
                    </Link>
                  </li>
                  <div className="h-px bg-slate-100 my-1.5"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 py-2.5 rounded-lg hover:bg-rose-50 text-rose-600 font-semibold text-sm transition-colors"
                    >
                      <FiLogOut className="w-4 h-4 text-rose-500" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (

              <div className="flex items-center space-x-3">
                {/* Transparent Border Button */}
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-sm font-extrabold text-slate-700 bg-transparent border border-slate-200 hover:border-brand-primary hover:text-brand-primary  transition-all duration-200"
                >
                  Sign In
                </Link>
                {/* Solid Gradient Button */}
                <Link
                  href="/register"
                  className="px-6 py-2.5 text-sm font-extrabold text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 transition-all duration-300 ease-in-out shadow-lg ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="w-11/12 mx-auto py-5 space-y-2">
          {activeRoutes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all ${isActive
                  ? "bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-brand-primary"
                  }`}
              >
                {route.name}
              </Link>
            );
          })}

          <div className="h-px bg-slate-100 my-3"></div>

          <div className="px-4 pb-2">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative h-9 w-9 border-2 border-indigo-100 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={user?.image || '/images/user-icon-logo.png'}
                      alt={user?.name || 'expense tracker user logo'}
                      fill
                      className="object-cover"
                      sizes="36px"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 bg-white"
                  >
                    <FiUser /> <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-rose-50 text-sm font-bold text-rose-600"
                  >
                    <FiLogOut /> <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-sm font-bold text-slate-700 border border-slate-200 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-sm font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}