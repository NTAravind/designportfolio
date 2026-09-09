"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="w-full min-h-[85vh] bg-light-pink px-8 md:px-20 pt-16 pb-16 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Decorations */}
      <motion.div style={{ y: yText }} className="absolute top-40 right-[15%] text-text-dark/20 font-black text-4xl tracking-widest hidden md:block">
        + +
      </motion.div>
      <motion.div style={{ y: yText }} className="absolute bottom-32 left-[10%] text-text-dark/20 font-black text-2xl tracking-[0.4em] hidden md:block">
        / / / / /
      </motion.div>

      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text */}
        <motion.div 
          style={{ y: yText }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-2 z-10"
        >
          <p className="text-text-dark font-bold text-2xl md:text-3xl mb-2">
            Hello, I&apos;m Sharanya R,
          </p>
          <h1 className="text-text-dark font-black text-6xl md:text-[7.5rem] leading-[1.05] tracking-tighter">
            UI/UX
            <br />
            Designer
          </h1>
          <p className="text-text-dark font-bold text-xl md:text-2xl mt-4">
            based in India.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10"
          >
            <a
              href="#work"
              className="bg-cream border-2 border-text-dark text-text-dark px-10 py-3.5 rounded-full text-xl font-bold shadow-[6px_6px_0px_var(--text-dark)] hover:shadow-[2px_2px_0px_var(--text-dark)] hover:translate-y-1 hover:translate-x-1 transition-all inline-block"
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex-shrink-0 mt-10 md:mt-0 w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
        >
          {/* Decorative Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full border-2 border-text-dark/20 z-0"></div>
          
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/image 11.png"
              alt="Sharanya R hero illustration"
              fill
              className="object-contain relative z-10"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
