"use client";

import { Award, Zap, Globe } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-brand-800/50 mb-2">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-32 bg-brand-600/20 blur-[80px] rounded-full" />
      <div className="absolute top-0 right-1/4 w-64 h-24 bg-purple-600/15 blur-[60px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/40 rounded-full px-4 py-1.5 text-brand-300 text-xs font-semibold tracking-widest uppercase mb-6">
          <Zap size={12} className="text-yellow-400" />
          PromptCraft 2026
          <Zap size={12} className="text-yellow-400" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black neon-text bg-gradient-to-r from-white via-brand-200 to-brand-400 bg-clip-text text-transparent leading-tight">
          HyperText Certificate
          <br />
          <span className="text-2xl sm:text-4xl font-bold text-brand-300">
            Registry — Statement 3
          </span>
        </h1>

        <p className="mt-5 text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Official hypertext-converted certificate directory. Each student certificate is
          accessible via a structured{" "}
          <span className="text-brand-300 font-mono font-semibold">ROLLNO_XX_CERTIFICATE</span>{" "}
          hyperlink identifier connected to its Google Drive source.
        </p>

        {/* Feature chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
          {[
            { icon: <Globe size={12} />, label: "Drive → HyperText Converted" },
            { icon: <Award size={12} />, label: "17 Certificates Registered" },
            { icon: <Zap size={12} />,   label: "Instant Preview Enabled" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1"
            >
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
