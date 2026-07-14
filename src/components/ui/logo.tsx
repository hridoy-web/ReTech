import Link from "next/link";
import { FiCpu } from "react-icons/fi";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group select-none">
      {/* Logo Icon Wrapper */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary p-[1.5px] transition-transform duration-300 group-hover:scale-105">
        <div className="flex items-center justify-center w-full h-full bg-white rounded-[7px]">
          <FiCpu className="w-5 h-5 text-brand-primary transition-colors duration-300 group-hover:text-brand-secondary" />
        </div>
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
      </div>

      {/* Brand Text */}
      <span className="text-3xl font-extrabold tracking-tight text-slate-900">
        Re<span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Tech</span>
      </span>
    </Link>
  );
}