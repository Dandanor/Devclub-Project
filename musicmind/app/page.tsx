"use client";

import { useState, useRef, useEffect } from "react";

const EXAMPLE_PROMPTS = [
  "Something like Arctic Monkeys' Humbug but heavier",
  "Chill lo-fi beats for late night studying",
  "Upbeat indie pop similar to Tame Impala",
  "Dark jazz with a cinematic feel",
  "80s synth-wave with a modern twist",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(EXAMPLE_PROMPTS[0]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Cycle through example prompts in the placeholder
  useEffect(() => {
    let i = 1;
    const interval = setInterval(() => {
      setPlaceholder(EXAMPLE_PROMPTS[i % EXAMPLE_PROMPTS.length]);
      i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Will wire up to AI + Spotify API in a later step
    console.log("Query submitted:", query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Header ── */}
      <header
        className="flex items-center justify-between px-8 py-5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3">
          {/* Animated equalizer logo */}
          <div className="flex items-end gap-[3px] h-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="eq-bar w-[3px] rounded-full origin-bottom"
                style={{ height: "100%", background: "var(--accent)" }}
              />
            ))}
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Music<span style={{ color: "var(--accent)" }}>Mind</span>
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          <a
            href="#"
            className="transition-colors hover:text-white"
            style={{ color: "var(--text-secondary)" }}
          >
            Explore
          </a>
          <a
            href="#"
            className="transition-colors hover:text-white"
            style={{ color: "var(--text-secondary)" }}
          >
            Favorites
          </a>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: "var(--accent)",
              color: "#000",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.background =
                "var(--accent-hover)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.background = "var(--accent)")
            }
          >
            Connect Spotify
          </button>
        </nav>
      </header>

      {/* ── Hero Section ── */}
      <main className="flex flex-col items-center flex-1 px-6 pt-20 pb-12">
        {/* Tagline */}
        <div className="flex flex-col items-center text-center mb-12 gap-4">
          <span
            className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full border"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
              background: "rgba(29,185,84,0.08)",
            }}
          >
            Powered by Gemini + Spotify
          </span>
          <h1
            className="text-5xl font-bold tracking-tight leading-tight max-w-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            Describe your mood.
            <br />
            <span style={{ color: "var(--accent)" }}>Discover your sound.</span>
          </h1>
          <p
            className="text-lg max-w-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Tell MusicMind what you&apos;re in the mood for — a vibe, a genre, an
            artist you love — and get personalised recommendations with Spotify
            previews instantly.
          </p>
        </div>

        {/* ── Chat Input Box ── */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl"
        >
          <div
            className="relative rounded-2xl border transition-all"
            style={{
              background: "var(--bg-card)",
              borderColor: query ? "var(--accent)" : "var(--border)",
              boxShadow: query
                ? "0 0 30px rgba(29,185,84,0.2)"
                : "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              className="chat-input w-full resize-none bg-transparent px-6 pt-5 pb-14 text-base leading-relaxed transition-colors placeholder-opacity-50"
              style={{
                color: "var(--text-primary)",
                caretColor: "var(--accent)",
              }}
            />

            {/* Bottom bar inside input */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 pb-3"
            >
              <span
                className="text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {query.length > 0
                  ? "Press Enter to search · Shift+Enter for new line"
                  : "Try describing a vibe, an artist, or a moment…"}
              </span>

              <button
                type="submit"
                disabled={!query.trim()}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: query.trim() ? "var(--accent)" : "var(--bg-hover)",
                  color: query.trim() ? "#000" : "var(--text-muted)",
                }}
              >
                {/* Send icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
                Find Music
              </button>
            </div>
          </div>
        </form>

        {/* ── Quick suggestion chips ── */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-2xl">
          {[
            "🎸 Heavy rock",
            "🌙 Late night vibes",
            "🎹 Cinematic instrumentals",
            "🕺 Feel-good 90s",
            "☁️ Dream pop",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="px-3 py-1.5 rounded-full text-sm border transition-all hover:border-green-500 hover:text-white"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="text-center py-6 text-xs border-t"
        style={{
          color: "var(--text-muted)",
          borderColor: "var(--border)",
        }}
      >
        MusicMind · Powered by{" "}
        <span style={{ color: "var(--accent)" }}>Gemini</span> &amp;{" "}
        <span style={{ color: "var(--accent)" }}>Spotify</span>
      </footer>
    </div>
  );
}
