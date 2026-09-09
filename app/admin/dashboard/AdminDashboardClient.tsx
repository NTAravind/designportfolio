"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase, type Project } from "@/lib/supabase";

interface AdminDashboardClientProps {
  initialProjects: Project[];
}

export default function AdminDashboardClient({
  initialProjects,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [name, setName] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let thumbnailUrl = "";

      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("project-thumbnails")
          .upload(fileName, thumbnailFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("project-thumbnails")
          .getPublicUrl(fileName);

        thumbnailUrl = urlData.publicUrl;
      }

      const { data, error: insertError } = await supabase
        .from("projects")
        .insert([{ name, thumbnail_url: thumbnailUrl, figma_link: figmaLink }])
        .select()
        .single();

      if (insertError) throw insertError;

      setProjects([data, ...projects]);
      setName("");
      setFigmaLink("");
      setThumbnailFile(null);
      setThumbnailPreview("");
      setShowAddDialog(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleteId(id);
    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (!deleteError) {
      setProjects(projects.filter((p) => p.id !== id));
    }
    setDeleteId(null);
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-[#f9a8d4]">
      {/* Header */}
      <header className="bg-white border-b border-[#e8b4cc] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#f9a8d4]">
            <Image
              src="/images/images-5.jpeg"
              alt="Admin avatar"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-[#1e1b4b] font-bold text-sm">bibble</p>
            <p className="text-gray-400 text-xs">Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-[#1e1b4b] hover:text-[#ec4899] transition-colors"
          >
            ← View Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm bg-[#1e1b4b] text-white px-4 py-1.5 rounded-lg hover:bg-[#312e81] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Title row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#1e1b4b] font-black text-4xl">
              UX Projects
            </h1>
            <p className="text-[#1e1b4b] opacity-70 mt-1">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setShowAddDialog(true)}
            className="bg-[#1e1b4b] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#312e81] transition-colors text-sm"
          >
            + Add Project
          </button>
        </div>

        {/* Projects grid */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e8b4cc] p-16 text-center">
            <p className="text-gray-400 text-lg">No projects yet.</p>
            <p className="text-gray-300 text-sm mt-1">
              Click &quot;Add Project&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-[#e8b4cc] overflow-hidden shadow-sm"
              >
                <div className="relative w-full h-40 bg-[#fce7f3]">
                  {project.thumbnail_url ? (
                    <Image
                      src={project.thumbnail_url}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-[#1e1b4b] font-bold text-base mb-1">
                    {project.name}
                  </h3>
                  <a
                    href={project.figma_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ec4899] text-xs hover:underline truncate block mb-3"
                  >
                    {project.figma_link}
                  </a>
                  <div className="flex gap-2">
                    <a
                      href={project.figma_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-xs border border-[#1e1b4b] text-[#1e1b4b] py-1.5 rounded-lg hover:bg-[#1e1b4b] hover:text-white transition-colors"
                    >
                      Open Figma
                    </a>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteId === project.id}
                      className="flex-1 text-xs border border-red-300 text-red-500 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {deleteId === project.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Project Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-[#e8b4cc]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#1e1b4b] font-black text-2xl">
                Add Project
              </h2>
              <button
                onClick={() => {
                  setShowAddDialog(false);
                  setError("");
                  setName("");
                  setFigmaLink("");
                  setThumbnailFile(null);
                  setThumbnailPreview("");
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddProject} className="flex flex-col gap-4">
              {/* Project Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-sm font-semibold">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-[#e8b4cc] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9a8d4] text-[#1e1b4b]"
                  placeholder="e.g. Infini.io Redesign"
                  required
                />
              </div>

              {/* Figma Link */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-sm font-semibold">
                  Figma Link *
                </label>
                <input
                  type="url"
                  value={figmaLink}
                  onChange={(e) => setFigmaLink(e.target.value)}
                  className="border border-[#e8b4cc] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9a8d4] text-[#1e1b4b]"
                  placeholder="https://figma.com/..."
                  required
                />
              </div>

              {/* Thumbnail Upload */}
              <div className="flex flex-col gap-1">
                <label className="text-[#1e1b4b] text-sm font-semibold">
                  Thumbnail *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#e8b4cc] rounded-lg p-4 text-center cursor-pointer hover:border-[#f9a8d4] transition-colors"
                >
                  {thumbnailPreview ? (
                    <div className="relative w-full h-32">
                      <Image
                        src={thumbnailPreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="py-4">
                      <p className="text-gray-400 text-sm">
                        Click to upload thumbnail
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        PNG, JPG, WebP supported
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddDialog(false);
                    setError("");
                  }}
                  className="flex-1 border border-[#e8b4cc] text-[#1e1b4b] py-2 rounded-lg text-sm hover:bg-[#fce7f3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#1e1b4b] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#312e81] transition-colors disabled:opacity-60"
                >
                  {loading ? "Uploading…" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
