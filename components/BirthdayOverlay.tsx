"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SECRET = "poopingbibble";
const STORAGE_KEY = "birthday_bibble_seen";
const SHOW_DELAY_MS = 1200;
const SLIDE_DURATION_MS = 4200;

const SLIDES = ["birthday", "admin", "present"] as const;
type SlideIndex = 0 | 1 | 2;

const GIFS = [
  {
    src: "/images/bibble/32727ff6a40d7334fb631b271f825e3e.gif",
    alt: "Happy bibble",
    width: 180,
    height: 180,
    drift: 1,
  },
  {
    src: "/images/bibble/oh40yM.gif",
    alt: "Excited bibble",
    width: 140,
    height: 140,
    drift: 1.5,
  },
  {
    src: "/images/bibble/bibble-shrugging.gif",
    alt: "Bibble shrugging",
    width: 160,
    height: 160,
    drift: 2,
  },
];

const CONFETTI = ["🎈", "🎉", "💖", "✨", "🎊", "💝", "🌟", "🥳"];

type Phase = "hidden" | "entering" | "showing" | "done";

function seededRandom(seed: number) {
  return () => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BirthdayOverlay() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [slideIndex, setSlideIndex] = useState<SlideIndex>(0);

  const siteOrigin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== "undefined" ? window.location.origin : "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (phase !== "hidden") return;

    const params = new URLSearchParams(window.location.search);
    const secret = params.get("bday");
    if (!secret || secret.toLowerCase() !== SECRET) return;

    window.history.replaceState(
      {},
      "",
      params.toString()
        ? `${window.location.pathname}?${params}`
        : window.location.pathname
    );

    const start = setTimeout(() => setPhase("entering"), 50);
    const show = setTimeout(() => setPhase("showing"), SHOW_DELAY_MS);

    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(start);
      clearTimeout(show);
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "showing") return;

    const timer = setTimeout(() => {
      if (slideIndex < SLIDES.length - 1) {
        setSlideIndex((slideIndex + 1) as SlideIndex);
      } else {
        setPhase("done");
      }
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [phase, slideIndex]);

  useEffect(() => {
    if (phase === "done" && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, "1");
      document.body.style.overflow = "";
    }
  }, [phase]);

  const confetti = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      emoji: CONFETTI[i % CONFETTI.length],
      x: rand() * 100,
      y: rand() * 100,
      size: 18 + rand() * 22,
      delay: rand() * 1.2,
      duration: 3 + rand() * 2,
      rotate: rand() * 200,
    }));
  }, []);

  const visible = phase !== "hidden" && phase !== "done";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="birthday-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.7 } }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center bg-light-pink"
        >
          {/* Watercolor backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-pink via-light-pink to-cream opacity-90" />
          <div className="absolute inset-0 opacity-[0.15] text-text-dark font-black text-3xl tracking-widest select-none pointer-events-none">
            <span className="absolute top-12 left-[8%]">+ +</span>
            <span className="absolute bottom-16 right-[10%]">+ +</span>
            <span className="absolute bottom-24 left-[20%]">/ / / / /</span>
          </div>

          {/* Floating confetti */}
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              className="absolute select-none pointer-events-none"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                fontSize: `${c.size}px`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0.9, 0],
                scale: [0, 1.2, 1, 0.6],
                y: [0, -50, 10],
                rotate: c.rotate,
              }}
              transition={{
                duration: c.duration,
                delay: c.delay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              {c.emoji}
            </motion.span>
          ))}

          {/* Corner bibbles (decor on every slide) */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -20 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
            className="absolute top-[10%] left-[6%] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [-6, -3, -6] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Image
                src={GIFS[0].src}
                alt={GIFS[0].alt}
                width={GIFS[0].width}
                height={GIFS[0].height}
                unoptimized
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 20 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="absolute top-[16%] right-[7%] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [6, 8, 6] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <Image
                src={GIFS[1].src}
                alt={GIFS[1].alt}
                width={GIFS[1].width}
                height={GIFS[1].height}
                unoptimized
              />
            </motion.div>
          </motion.div>

          {/* Slideshow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -90 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              {slideIndex === 0 && (
                <>
                  <div className="text-center bg-cream border-4 border-text-dark rounded-3xl shadow-[10px_10px_0px_var(--text-dark)] px-6 py-8 md:px-14 md:py-10 max-w-xl mx-4 rotate-[-2deg]">
                    <motion.div
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="inline-block bg-dark-pink border-2 border-text-dark rounded-full px-5 py-1.5 text-text-dark font-black text-sm md:text-base tracking-wider uppercase mb-5"
                    >
                      🎂 Special delivery 🎉
                    </motion.div>
                    <h1 className="text-text-dark font-black text-4xl md:text-6xl leading-[1.05] tracking-tighter">
                      Many more
                      <br />
                      belated happy birthday
                      <br />
                      <span className="inline-block">bibble </span>
                      <span className="inline-block text-dark-pink rotate-2">
                        HEHEHE
                      </span>
                    </h1>
                  </div>

                  <div className="flex items-end gap-6 md:gap-8 mt-8 md:mt-10">
                    {GIFS.map((g) => (
                      <motion.div
                        key={g.src}
                        initial={{ opacity: 0, y: 80, scale: 0.4 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 16 }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -12, 0],
                            rotate: [-4, 2, -4],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3 + g.drift,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src={g.src}
                            alt={g.alt}
                            width={g.width}
                            height={g.height}
                            unoptimized
                            className="drop-shadow-[4px_4px_0px_rgba(45,43,84,0.25)]"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {slideIndex === 1 && (
                <div className="text-center bg-cream border-4 border-text-dark rounded-3xl shadow-[10px_10px_0px_var(--text-dark)] px-6 py-8 md:px-12 md:py-10 max-w-lg mx-4 rotate-[1.5deg]">
                  <div className="inline-block bg-dark-pink border-2 border-text-dark rounded-full px-5 py-1.5 text-text-dark font-black text-sm md:text-base tracking-wider uppercase mb-4">
                    🎛️ Bonus reveal
                  </div>
                  <h2 className="text-text-dark font-black text-2xl md:text-4xl leading-tight tracking-tight mb-2">
                    This site has a secret
                    <br />
                    admin panel too
                  </h2>
                  <p className="text-text-dark font-bold text-base md:text-lg mb-5">
                    For the curious ones —
                  </p>

                  <div className="bg-light-pink border-2 border-text-dark rounded-2xl px-5 py-4 flex flex-col gap-2.5 text-left">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-text-dark font-bold text-sm md:text-base">
                        Admin panel
                      </span>
                      <Link
                        href="/admin"
                        className="text-text-dark font-black text-sm md:text-base underline underline-offset-4 hover:text-dark-pink transition-colors truncate max-w-[55%]"
                      >
                        {siteOrigin}/admin
                      </Link>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-text-dark font-bold text-sm md:text-base">
                        username
                      </span>
                      <span className="text-text-dark font-black text-sm md:text-base">
                        bibble
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-text-dark font-bold text-sm md:text-base">
                        password
                      </span>
                      <span className="text-text-dark font-black text-sm md:text-base">
                        poopingbibble
                      </span>
                    </div>
                  </div>

                  <p className="text-text-dark font-bold text-sm md:text-base mt-5">
                    Peek if you dare 😏
                  </p>
                </div>
              )}

              {slideIndex === 2 && (
                <div className="text-center bg-cream border-4 border-text-dark rounded-3xl shadow-[10px_10px_0px_var(--text-dark)] px-6 py-10 md:px-14 md:py-12 max-w-xl mx-4 rotate-[-1.5deg]">
                  <div className="inline-block bg-dark-pink border-2 border-text-dark rounded-full px-5 py-1.5 text-text-dark font-black text-sm md:text-base tracking-wider uppercase mb-5">
                    🎁 Final stop
                  </div>
                  <h2 className="text-text-dark font-black text-3xl md:text-5xl leading-[1.1] tracking-tight">
                    psst… there&apos;s also a
                    <br />
                    real present waiting
                    <br />
                    for you 
                  </h2>
                   
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="relative z-10 flex items-center gap-3 mt-8">
            {SLIDES.map((slide, i) => (
              <button
                key={slide}
                onClick={() => setSlideIndex(i as SlideIndex)}
                aria-label={`Slide ${i + 1}`}
                className={`h-3 rounded-full border-2 border-text-dark transition-all duration-300 ${
                  i === slideIndex
                    ? "w-8 bg-dark-pink shadow-[3px_3px_0px_var(--text-dark)]"
                    : "w-3 bg-cream hover:bg-dark-pink/50"
                }`}
              />
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            onClick={() => setPhase("done")}
            className="relative z-10 mt-6 text-text-dark font-bold text-sm md:text-base underline underline-offset-4 hover:text-dark-pink transition-colors"
          >
            Skip the party, take me to the site →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}