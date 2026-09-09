"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", type: "spring", bounce: 0.4 }}
      className="w-full px-8 py-4 flex items-center justify-between bg-cream rounded-full mx-auto max-w-5xl mt-6 border-2 border-text-dark shadow-[4px_4px_0px_var(--text-dark)] z-50 relative"
    >
      <span className="font-black text-text-dark text-xl tracking-tight">
        Sharanya R
      </span>
      <div className="flex gap-8 text-base font-bold text-text-dark">
        <Link href="#home" className="hover:text-pink-500 hover:-translate-y-0.5 transition-all">
          Home
        </Link>
        <Link href="#about" className="hover:text-pink-500 hover:-translate-y-0.5 transition-all">
          About
        </Link>
        <Link href="#work" className="hover:text-pink-500 hover:-translate-y-0.5 transition-all">
          Work
        </Link>
      </div>
    </motion.nav>
  );
}
