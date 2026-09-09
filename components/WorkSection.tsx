"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/supabase";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface WorkSectionProps {
  projects: Project[];
}

export default function WorkSection({ projects }: WorkSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 4);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 30, rotate: -2 },
    show: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  return (
    <section id="work" className="w-full bg-light-pink px-8 md:px-20 py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="text-text-dark font-black text-[5rem] md:text-[7rem] mb-6 tracking-tighter"
        >
          work.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-dark text-2xl font-bold mb-2"
        >
          A little peek at my work ✦
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-dark text-xl font-medium mb-16"
        >
          Some of my favorite projects, designs, and ideas brought to life.
        </motion.p>

        {projects.length === 0 ? (
          <p className="text-text-dark opacity-60 italic font-semibold text-xl bg-white/50 inline-block px-6 py-3 rounded-xl border-2 border-text-dark/20 border-dashed">
            No projects yet. Add some from the admin panel!
          </p>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-16"
            >
              <AnimatePresence>
                {visible.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} layout>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {projects.length > 4 && (
              <div className="flex justify-center">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setShowAll(!showAll)}
                  className="bg-cream border-2 border-text-dark text-text-dark px-10 py-3.5 rounded-full text-xl font-bold shadow-[6px_6px_0px_var(--text-dark)] hover:shadow-[2px_2px_0px_var(--text-dark)] hover:translate-y-1 hover:translate-x-1 transition-all inline-block"
                >
                  {showAll ? "Show Less" : "View More"}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
