"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="w-full bg-dark-pink px-8 md:px-20 py-20 md:py-28 relative overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, var(--text-dark) 2px, transparent 2.5px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-text-dark font-black text-[5rem] md:text-[7rem] mb-10 tracking-tighter"
        >
          about.
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1"
          >
            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border-2 border-text-dark shadow-[8px_8px_0px_var(--text-dark)] mb-12">
              <p className="text-text-dark text-xl leading-relaxed font-semibold">
                I&apos;m a 4th-year Computer Science student, with a minor in
                Digital Experience Design. I enjoy turning complex ideas into
                simple, intuitive experiences that are both functional and fun to
                use. I&apos;m especially interested in how design and technology
                can come together to create better digital experiences.
              </p>
            </motion.div>

            <ul className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px before:h-full before:w-1 before:bg-text-dark/20 ml-2">
              <motion.li variants={itemVariants} className="relative flex items-center group is-active pl-16">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark-pink bg-text-dark text-white shadow-[0_0_0_2px_var(--text-dark)] absolute left-0 z-10 transition-transform group-hover:scale-125"></div>
                <div className="w-full p-6 rounded-2xl border-2 border-text-dark bg-cream shadow-[4px_4px_0px_var(--text-dark)]">
                  <p className="font-black text-text-dark text-lg mb-2">
                    August 2023–June 2027
                  </p>
                  <p className="text-text-dark font-bold text-base">
                    Bsc. (hons) Computer Science Student
                  </p>
                  <p className="text-text-dark font-medium text-sm mt-1">
                    Minors in Digital Experience Design <br/> CGPA: 9
                  </p>
                </div>
              </motion.li>

              <motion.li variants={itemVariants} className="relative flex items-center group is-active pl-16">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark-pink bg-text-dark text-white shadow-[0_0_0_2px_var(--text-dark)] absolute left-0 z-10 transition-transform group-hover:scale-125"></div>
                <div className="w-full p-6 rounded-2xl border-2 border-text-dark bg-white shadow-[4px_4px_0px_var(--text-dark)]">
                  <p className="font-black text-text-dark text-lg mb-2">May 2026–Present</p>
                  <p className="text-text-dark font-bold text-base">
                    Software Engineering Intern at Arkahub
                  </p>
                  <p className="text-text-dark font-medium text-sm mt-1">
                    Working on UI/UX testing and UI/UX design and redesigns
                  </p>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          {/* About Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="flex-shrink-0 md:w-[400px] flex justify-center items-center mt-12 md:mt-0"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative bg-white p-6 rounded-[3rem] border-2 border-text-dark shadow-[8px_8px_0px_var(--text-dark)]"
            >
              <Image
                src="/images/image 10.png"
                alt="About illustration"
                width={300}
                height={280}
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
