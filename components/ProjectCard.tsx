"use client";
import Image from "next/image";
import type { Project } from "@/lib/supabase";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, x: -5 }}
      className="flex flex-col items-center gap-4 group w-full"
    >
      <a
        href={project.figma_link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-text-dark shadow-[6px_6px_0px_var(--text-dark)] bg-cream relative flex items-center justify-center p-4 transition-all group-hover:shadow-[10px_10px_0px_var(--text-dark)]">
          {project.thumbnail_url ? (
             <Image
              src={project.thumbnail_url}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-text-dark font-bold opacity-30">No Image</div>
          )}
        </div>
      </a>
      <p className="text-text-dark text-xl font-bold text-center mt-2 bg-white/50 px-4 py-1 rounded-full border border-text-dark/20">
        {project.name}
      </p>
    </motion.div>
  );
}
