"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-dark-pink px-8 md:px-20 py-20 md:py-28 pb-32 relative overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, var(--text-dark) 2px, transparent 2.5px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="text-text-dark font-black text-[5rem] md:text-[7rem] mb-6 tracking-tighter"
        >
          contact.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-dark text-2xl font-bold mb-2"
        >
          Let&apos;s make something nice.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-dark text-xl font-medium mb-20"
        >
          Have a project, idea, or just want to say hi? I&apos;d love to hear
          from you.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="flex-shrink-0"
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative bg-white p-6 rounded-[3rem] border-2 border-text-dark shadow-[8px_8px_0px_var(--text-dark)]"
            >
              <Image
                src="/images/image 9.png"
                alt="Contact illustration"
                width={280}
                height={260}
                className="object-contain"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6 w-full max-w-md"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Sharanyar5533@gmail.com&su=Interest%20in%20UI%20Design&body=hey%20i%20am%20interested%20in%20ui%20design%20if%20that%27s%20possible"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cream border-2 border-text-dark text-text-dark px-8 py-5 rounded-2xl text-xl font-bold shadow-[6px_6px_0px_var(--text-dark)] hover:shadow-[2px_2px_0px_var(--text-dark)] hover:translate-y-1 hover:translate-x-1 transition-all text-center flex items-center justify-center gap-3"
            >
              <span className="text-2xl">✉️</span> Sharanyar5533@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/sharanya-r-u3r283/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-text-dark text-text-dark px-8 py-5 rounded-2xl text-xl font-bold shadow-[6px_6px_0px_var(--text-dark)] hover:shadow-[2px_2px_0px_var(--text-dark)] hover:translate-y-1 hover:translate-x-1 transition-all text-center flex items-center justify-center gap-3"
            >
              <span className="text-2xl">💼</span> Linkedin / Sharanya R
            </a>
            <a
              href="https://wa.me/919916247747"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cream border-2 border-text-dark text-text-dark px-8 py-5 rounded-2xl text-xl font-bold shadow-[6px_6px_0px_var(--text-dark)] hover:shadow-[2px_2px_0px_var(--text-dark)] hover:translate-y-1 hover:translate-x-1 transition-all text-center flex items-center justify-center gap-3"
            >
              <span className="text-2xl">💬</span> WhatsApp / 99162 47747
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
